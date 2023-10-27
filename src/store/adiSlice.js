import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bots: {},
  newSlot: null,
  error: null,
};

const adiSlice = createSlice({
  name: "adi",
  initialState,
  reducers: {
    initAdiBots: (state) => {
      state.bots = {};
      state.newSlot = null;
    },
    setIsWorking: (state, { payload }) => {
      if (state.bots[payload])
        state.bots[payload.username].isWorking = payload.isWorking;
    },
    startBot: (state, { payload }) => {
      if (state.bots[payload]) state.bots[payload].isStarting = true;
    },
    stopBot: (state, { payload }) => {
      if (state.bots[payload]) state.bots[payload].isStopping = true;
    },
    startedBot: (state, { payload }) => {
      if (state.bots[payload]) {
        state.bots[payload].isWorking = true;
        state.bots[payload].isStarting = false;
      }
    },
    stoppedBot: (state, { payload }) => {
      if (state.bots[payload]) {
        state.bots[payload].isWorking = false;
        state.bots[payload].isStopping = false;
      }
    },
    setBots: (state, { payload }) => {
      for (let username of payload) {
        state.bots[username] = { reservedSlots: [] };
      }
    },
    setReservedSlots: (state, { payload }) => {
      const { username, reservedSlots } = payload;
      if (state.bots[username]) {
        state.bots[username].reservedSlots = reservedSlots;
      }
    },
    alertedNewSlot: (state) => {
      state.newSlot = null;
    },
    newReservedSlotAlert: (state, { payload }) => {
      const { username, text } = payload;
      state.newSlot = { username, text };
    },
    botConnected: (state, { payload }) => {
      state.bots[payload] = { reservedSlots: [] };
    },
    botDisconnected: (state, { payload }) => {
      delete state.bots[payload];
    },
    acceptSlot: (state, { payload }) => {
      const { username, slot } = payload;
      if (state.bots[username]) {
        state.bots[username].acceptingSlot = slot;
      }
    },
    declineSlot: (state, { payload }) => {
      const { slot } = payload;
      // console.log(username, slot);
      if (state.bots[slot.username]) {
        state.bots[slot.username].reservedSlots = state.bots[
          slot.username
        ].reservedSlots.filter((reservedSlot) => {
          return (
            slot.category !== reservedSlot.category ||
            slot.testCentre !== reservedSlot.testCentre ||
            slot.slotType !== reservedSlot.slotType ||
            slot.dateTime !== reservedSlot.dateTime
          );
        });
      }
    },
    acceptedSlot: (state, { payload }) => {
      if (state.bots[payload]) {
        state.bots[payload].reservedSlots = state.bots[
          payload
        ].reservedSlots.filter(
          (slot) => slot !== state.bots[payload].acceptingSlot
        );
        state.bots[payload].acceptingSlot = null;
      }
    },
    declinedSlot: (state, { payload }) => {
      if (state.bots[payload]) {
        state.bots[payload].reservedSlots = state.bots[
          payload
        ].reservedSlots.filter((slot) => {
          let decliningSlot = state.bots[payload].decliningSlot;
          return (
            slot.category !== decliningSlot.category ||
            slot.testCentre !== decliningSlot.testCentre ||
            slot.slotType !== decliningSlot.slotType ||
            slot.dateTime !== decliningSlot.dateTime
          );
        });
        state.bots[payload].decliningSlot = null;
      }
    },
    errorAlert: (state, { payload }) => {
      state.error = payload;
    },
    alertedError: (state) => {
      state.error = null;
    },
  },
});

export const {
  alertedNewSlot,
  initAdiBots,
  startBot,
  startedBot,
  stopBot,
  stoppedBot,
  setBots,
  setReservedSlots,
  acceptSlot,
  declineSlot,
  acceptedSlot,
  declinedSlot,
  botConnected,
  botDisconnected,
  setIsWorking,
  newReservedSlotAlert,
  errorAlert,
  alertedError,
} = adiSlice.actions;
export default adiSlice.reducer;
