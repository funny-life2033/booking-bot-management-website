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
import { connected, connectFailed } from "../store/authSlice";

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
            dispatch(connected());
            dispatch(setAdiBots(connectedAdiBots));
          }
        );

        socket.on("app connect failed", (err) => {
          dispatch(connectFailed(err));
        });

        socket.on("adi bot connect", (botId) => {
          dispatch(adiBotConnected(botId));
        });

        socket.on("adi bot disconnect", (botId) => {
          console.log("adi bot disconnect ", botId);
          dispatch(adiBotDisconnected(botId));
        });

        socket.on("adi bot started", ({ botId }) => {
          dispatch(startedAdiBot(botId));
        });

        socket.on("adi bot stopped", ({ botId }) => {
          dispatch(stoppedAdiBot(botId));
        });

        socket.on("adi accepted slot", ({ botId }) => {
          dispatch(adiAcceptedSlot(botId));
        });

        socket.on("adi declined slot", ({ botId }) => {
          dispatch(adiDeclinedSlot(botId));
        });

        socket.on(
          "adi bot reserved slots",
          ({ botId, isWorking, reservedSlots }) => {
            dispatch(adiSetIsWorking({ botId, isWorking }));
            dispatch(setAdiReservedSlots({ botId, reservedSlots }));
          }
        );

        socket.on("adi reserved new slot", (data) => {
          dispatch(setAdiReservedSlots(data));
        });

        socket.on("error alert", (data) => {
          console.log("error alert", data);
        });

        socket.on("alert", ({ botId, text, slots }) => {
          dispatch(adiNewReservedSlotAlert({ botId, text }));
        });

        socket.emit("app connect");

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
        //   to: payload.botId,
        //   ...payload.slot,
        // });
        socket.emit("message", "adi accept slot", {
          to: payload.slot.botId,
          ...payload.slot,
        });
        break;
      }
      case "adi/declineSlot": {
        socket.emit("message", "adi decline slot", {
          to: payload.slot.botId,
          ...payload.slot,
        });

        // dispatch(adiDeclinedSlot(payload.slot.botId));
        break;
      }
    }

    return next(action);
  };
}
