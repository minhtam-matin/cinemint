import { createSlice } from "@reduxjs/toolkit";

export const stateDefault = createSlice({
  name: "danhSachGheDangDat",
  initialState: {
    danhSachGheDangDat: [],
  },
  reducers: {
    datVe: (state, action) => {
      let index = state.danhSachGheDangDat.findIndex(
        (gheDangDat) => gheDangDat.soGhe === action.payload.soGhe
      );
      if (index !== -1) {
        state.danhSachGheDangDat.splice(index, 1);
      } else {
        state.danhSachGheDangDat.push(action.payload);
      }
    },
    huyVe: (state, action) => {
      let index = state.danhSachGheDangDat.findIndex(
        (gheDangDat) => gheDangDat.soGhe === action.payload.soGhe
      );
      if (index !== -1) {
        state.danhSachGheDangDat.splice(index, 1);
      }
    },
  },
});

export const { datVe, huyVe } = stateDefault.actions;
export const datGhe = (state) => state.danhSachGheDangDat.danhSachGheDangDat;
export default stateDefault.reducer;
