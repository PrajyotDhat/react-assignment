import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  modal: {
    name: "",
    data: null
  },
  isModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal.name = action.payload.name;
      state.modal.data = action.payload.data;
      state.isModalOpen = true;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});
export const { setModal, setIsModalOpen } = modalSlice.actions;
export default modalSlice.reducer;