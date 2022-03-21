import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { datGhe, datVe } from "../features/bookingTicketReducer";

function HangGhe(hangGhe, soHangGhe) {
  const danhSachGheDangDat = useSelector(datGhe);

  const dispatch = useDispatch();

  function renderGhe() {
    return hangGhe.hangGhe.danhSachGhe.map((ghe, index) => {
      let cssGheDaDat = "";
      let disabled = false;
      if (ghe.daDat) {
        cssGheDaDat = "gheDuocChon";
        disabled = true;
      }

      let cssGheDangChon = "";
      let indexGheDangChon = danhSachGheDangDat.findIndex(
        (gheDangDat) => gheDangDat.soGhe === ghe.soGhe
      );
      if (indexGheDangChon !== -1) {
        cssGheDangChon = "gheDangChon";
      }

      return (
        <button
          onClick={() => {
            console.log(ghe);
            dispatch(datVe(ghe));
          }}
          disabled={disabled}
          className={`ghe ${cssGheDaDat} ${cssGheDangChon} `}
          key={index}
        >
          {ghe.soGhe}
        </button>
      );
    });
  }

  function renderSoHang() {
    return hangGhe.hangGhe.danhSachGhe.map((hang, index) => {
      return (
        <button disabled className="rowNumber">
          {hang.soGhe}
        </button>
      );
    });
  }

  function renderHangGhe() {
    if (hangGhe.hangGhe.hang === "") {
      return (
        <div className="ml-3">
          {hangGhe.hangGhe.hang} {renderSoHang()}
        </div>
      );
    } else {
      return (
        <Fragment>
          {hangGhe.hangGhe.hang} {renderGhe()}
        </Fragment>
      );
    }
  }

  return (
    <div className="text-light text-left ml-4 mt-4">{renderHangGhe()}</div>
  );
}

export default HangGhe;
