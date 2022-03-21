import React from "react";
import { useFormik } from "formik";
import { auth } from "./firebase";
import { TextField } from "@mui/material";
import "./Profile.css";
import * as yup from "yup";
import { updateProfile } from "firebase/auth";

function Profile() {
  const user = auth.currentUser;
  // console.log(user);
  const validationSchema = yup.object({
    username: yup
      .string()
      .matches(
        "[a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]",
        "Enter your name"
      )
      .required("Your name is required"),
    phone: yup
      .string()
      .matches("[0-9]", "Enter your phone number")
      .min(9, "Password should be of minimum 9 characters length")
      .max(11, "Password should be of maximum 11 characters length")
      .required("Phone is required"),
    url: yup.string().url("Only Url"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      url: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateProfile(auth.currentUser, {
        displayName: values.username,
        photoURL: values.url,
      })
        .then(() => {
          alert("Cập nhật thành công");
        })
        .catch((err) => {
          alert("Cập nhật thất bại", err);
        });
    },
  });

  return (
    <div className="profile">
      <div className="profile_body">
        <h1>Edit Profile</h1>
        <div className="profile_info">
          <img
            src={
              user?.photoURL
                ? user.photoURL
                : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            }
            alt="avatar"
          />
          <div className="profile_detail">
            <h2>Email: {user?.email}</h2>
            <div className="profile_plans">
              <div className="form-profile">
                <form onSubmit={formik.handleSubmit} autocomplete="off">
                  <div className="item-profile">
                    <TextField
                      fullWidth
                      id="outlined-required"
                      defaultValue={
                        user?.displayName ? user.displayName : "Your Name?"
                      }
                      name="username"
                      label="Your Name"
                      type="text"
                      variant="outlined"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                    />
                  </div>

                  <div className="item-profile">
                    <TextField
                      fullWidth
                      id="outlined-required"
                      defaultValue={
                        user?.photoURL ? user.photoURL : "Link Photo?"
                      }
                      name="url"
                      label="Link Photo"
                      type="url"
                      variant="outlined"
                      onChange={formik.handleChange}
                      error={formik.touched.url && Boolean(formik.errors.url)}
                      helperText={formik.touched.url && formik.errors.url}
                    />
                  </div>
                  <button className="profile_signOut" type="submit">
                    Lưu
                  </button>
                </form>
              </div>
              <button
                className="profile_signOut"
                onClick={() => auth.signOut()}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
