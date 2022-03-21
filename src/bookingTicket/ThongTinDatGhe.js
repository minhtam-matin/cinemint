import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { datGhe, huyVe } from "../features/bookingTicketReducer";

function ThongTinDatGhe() {
  const danhSachGheDangDat = useSelector(datGhe);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="mt-4">
        <button disabled className="gheDuocChon"></button>
        <span style={{ fontSize: "20px" }} className="text-light ml-2">
          Ghế đã đặt
        </span>
        <br />
        <button disabled className="gheDangChon"></button>
        <span style={{ fontSize: "20px" }} className="text-light ml-2">
          Ghế đang đặt
        </span>
        <br />
        <button
          style={{ margin: "0" }}
          disabled
          className="btn-light ghe ml-0"
        ></button>
        <span style={{ fontSize: "20px" }} className="text-light ml-2">
          Ghế chưa đặt
        </span>
      </div>

      <div className="mt-5">
        <table className="table" border="2">
          <thead>
            <tr className="text-white" style={{ fontSize: 20 }}>
              <th>Số ghế</th>
              <th>Giá</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-warning">
            {danhSachGheDangDat.map((gheDangDat, index) => {
              return (
                <tr key={index}>
                  <td>{gheDangDat.soGhe}</td>
                  <td>{gheDangDat.gia.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        dispatch(huyVe(gheDangDat));
                      }}
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="text-warning">
            <tr>
              <td></td>
              <td>Tổng Tiền</td>
              <td>
                {danhSachGheDangDat
                  .reduce((tongTien, gheDangDat, index) => {
                    return (tongTien += gheDangDat.gia);
                  }, 0)
                  .toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default ThongTinDatGhe;
