import {
  acceptedSlot as adiAcceptedSlot,
  botConnected as adiBotConnected,
  botDisconnected as adiBotDisconnected,
  declinedSlot as adiDeclinedSlot,
  setBots as setAdiBots,
  setReservedSlots as setAdiReservedSlots,
  startedBot as startedAdiBot,
  stoppedBot as stoppedAdiBot,
  setIsWorking as adiSetIsWorking,
  newReservedSlotAlert as adiNewReservedSlotAlert,
  initAdiBots,
} from "../store/adiSlice";
import { connected, connectFailed, getClients } from "../store/authSlice";

export default function socketMiddleware(socket) {
  return (params) => (next) => (action) => {
    const { dispatch } = params;
    const { type, payload } = action;

    switch (type) {
      case "user/connect": {
        socket.connect();

        socket.on(
          "app connect success",
          ({ connectedAdiBots, connectedStudentBots }) => {
            console.log("app connect success");
            socket.isConnected = true;
            dispatch(connected());
            dispatch(setAdiBots(connectedAdiBots));
            dispatch(getClients());
          }
        );

        socket.on("app connect failed", (err) => {
          dispatch(connectFailed(err));
        });

        socket.on("adi bot connect", (username) => {
          dispatch(adiBotConnected(username));
        });

        socket.on("adi bot disconnect", (username) => {
          console.log("adi bot disconnect ", username);
          dispatch(adiBotDisconnected(username));
        });

        socket.on("adi bot started", ({ username }) => {
          dispatch(startedAdiBot(username));
        });

        socket.on("adi bot stopped", ({ username }) => {
          dispatch(stoppedAdiBot(username));
        });

        socket.on("adi accepted slot", ({ username }) => {
          dispatch(adiAcceptedSlot(username));
        });

        socket.on("adi declined slot", ({ username }) => {
          dispatch(adiDeclinedSlot(username));
        });

        socket.on(
          "adi bot reserved slots",
          ({ username, isWorking, reservedSlots }) => {
            dispatch(adiSetIsWorking({ username, isWorking }));
            dispatch(setAdiReservedSlots({ username, reservedSlots }));
          }
        );

        socket.on("adi reserved new slot", (data) => {
          dispatch(setAdiReservedSlots(data));
        });

        socket.on("error alert", (data) => {
          console.log("error alert", data);
        });

        socket.on("alert", ({ username, text, slots }) => {
          dispatch(adiNewReservedSlotAlert({ username, text }));
        });

        break;
      }
      case "user/disconnect": {
        socket.disconnect();
        dispatch(initAdiBots());
        break;
      }
      case "adi/startBot": {
        console.log("adi/startBot: ", payload);
        socket.emit("message", "adi bot start", { to: payload });
        break;
      }
      case "adi/stopBot": {
        socket.emit("message", "adi bot stop", { to: payload });
        break;
      }
      case "adi/acceptSlot": {
        // console.log({
        //   to: payload.username,
        //   ...payload.slot,
        // });
        socket.emit("message", "adi accept slot", {
          to: payload.slot.username,
          ...payload.slot,
        });
        break;
      }
      case "adi/declineSlot": {
        socket.emit("message", "adi decline slot", {
          to: payload.slot.username,
          ...payload.slot,
        });

        // dispatch(adiDeclinedSlot(payload.slot.username));
        break;
      }
      default: {
        break;
      }
    }

    return next(action);
  };
}
