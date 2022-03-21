import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./UserInfo.css";
import { Badge, Modal } from "antd";
import { useSelector } from "react-redux";
import { phimDaMua } from "./features/TvSlice";

function UserInfo() {
  const navigate = useNavigate();
  const itemTV = useSelector(phimDaMua);
  const user = auth.currentUser;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    alert("Chức năng thanh toán chưa được cập nhật");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="nav-dropdwn">
      <div className="nav-title">
        <span>
          {!user?.displayName ? "Your Name?" : `Hello ${user?.displayName}!`}
        </span>
      </div>
      <div className="nav-item">
        <ul>
          <li>
            <Link to="/profile">Thông tin tài khoản</Link>
          </li>
          <li>
            <Badge count={itemTV?.length} onClick={showModal}>
              Giỏ hàng TV
            </Badge>
            <Modal
              title="Giỏ hàng TV"
              visible={isModalVisible}
              onOk={handleOk}
              okText="Thanh Toán"
              onCancel={handleCancel}
            >
              {itemTV.length === 0 ? (
                <p>Empty</p>
              ) : (
                itemTV?.map((index) => (
                  <div
                    style={{
                      width: "100%",
                      margin: "5px 0",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/tv-detail/${index.id}`);
                      handleCancel();
                    }}
                  >
                    <img
                      className="itemTV_poster"
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face${index.poster_path}`}
                      alt="poster"
                    />
                    <span className="itemTV_name">{index.name}</span>
                  </div>
                ))
              )}
            </Modal>
          </li>
          <li>
            <button
              className="btn-logOut"
              onClick={() => {
                auth.signOut();
              }}
            >
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserInfo;
