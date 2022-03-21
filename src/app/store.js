import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import bookingTicketReducer from "../features/bookingTicketReducer";
import TvSlice from "../features/TvSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    danhSachGheDangDat: bookingTicketReducer,
    danhSachPhim: TvSlice,
  },
});
