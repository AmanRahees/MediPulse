import { createReducer } from "@reduxjs/toolkit";
import { SlotSelection } from "@/redux/actions/slotActions";

const initialState = {
  selectedDoctor: {},
  selectedSlot: {},
};

const slotReducer = createReducer(initialState, (builder) => {
  builder.addCase(SlotSelection, (state, action) => {
    const { doctor, selectedSlot } = action.payload;
    state.selectedDoctor = doctor;
    state.selectedSlot = selectedSlot;
  });
});

export default slotReducer;
