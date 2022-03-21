import { createSlice } from "@reduxjs/toolkit";

export const stateDefault = createSlice({
  name: "danhSachPhim",
  initialState: {
    danhSachPhim: [],
  },
  reducers: {
    muaPhim: (state, action) => {
      let index = state.danhSachPhim.findIndex(
        (phim) => phim.id === action.payload.id
      );
      if (index !== -1) {
        alert("Đã có trong giỏ hàng!");
      } else {
        state.danhSachPhim.push(action.payload);
        alert("Thêm vào giỏ hàng thành công!");
      }
    },
  },
});

export const { muaPhim } = stateDefault.actions;
export const phimDaMua = (state) => state.danhSachPhim.danhSachPhim;
export default stateDefault.reducer;
