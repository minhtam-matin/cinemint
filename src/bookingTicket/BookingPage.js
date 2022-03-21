import React from "react";
import "./assets/BaiTapBookingTicket.css";
import ThongTinDatGhe from "./ThongTinDatGhe";
import danhSachGhe from "./Data/danhSachGhe.json";
import HangGhe from "./hangGhe";

function BookingPage() {
  const danhSachHangGhe = danhSachGhe;
  function renderHangGhe() {
    return danhSachHangGhe.map((hangGhe, index) => {
      return (
        <div key={index}>
          <HangGhe hangGhe={hangGhe} soHangGhe={index} />
        </div>
      );
    });
  }

  return (
    <div
      className="bookingMovie"
      style={{
        width: "100%",
        height: "fit-content",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-8 text-center">
              <div style={{ fontSize: "45px" }} className="text-warning">
                Đặt vé xem phim
              </div>
              <div className="text-white mt-3" style={{ fontSize: "25px" }}>
                Màn Hình
              </div>
              <div
                className="mt-2"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <div className="screen"></div>
              </div>
              <div className="container bangGhe">{renderHangGhe()}</div>
            </div>
            <div className="col-4 pt-4">
              <div
                style={{ fontSize: "35px" }}
                className="display-4 text-warinng text-white mt-5"
              >
                Danh Sách Ghế Bạn Chọn
              </div>
              <ThongTinDatGhe />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
