import { Modal } from "@mui/material";
import React, { useState } from "react";
import SignInScreen from "./SignInScreen";
import "./btn-style.css";
import "./pagination.css";

function Login() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <button className="btn_login" onClick={handleOpen}>
        Login
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SignInScreen />
      </Modal>
    </div>
  );
}

export default Login;
