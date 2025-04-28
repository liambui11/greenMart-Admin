import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useEffect, useState } from "react";
import ValidationAuth from "./MyProfileValidationAuth";
// import "./StaffDetail.css";

import Swal from "sweetalert2";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import { useParams } from "react-router-dom";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";

function AuthDetail() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    position: "",
  });

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const res = await axiosInstanceStaff.get("/api/v1/admin/auth/detail");
        if (res.data.code === 200) {
          const user = res.data.info;
          console.log("admin auth detail", user);
          setValues({
            name: user.staffName || "",
            email: user.staffEmail || "",
            address: user.staffAddress || "",
            phone: user.staffPhone || "",
            position: user.roleID.roleName || "",
          });
          if (user.staffAvatar) {
            setFile(user.staffAvatar);
          }
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin user:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleInputPhone = (event) => {
    const onlyNums = event.target.value.replace(/\D/g, "");
    const validationErrors = ValidationAuth(values);

    setErrors(validationErrors);
    setValues((prev) => ({
      ...prev,
      [event.target.name]: onlyNums,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = ValidationAuth(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("staffName", values.name);
        formData.append("staffPhone", values.phone);
        formData.append("staffAddress", values.address);
        // formData.append("staffAddress", values.address);

        const imageFile = document.getElementById("fileInput").files[0];
        if (imageFile) {
          formData.append("staffAvatar", imageFile);
        }

        const res = await axiosInstanceStaff.put(
          "/api/v1/admin/auth/update",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data.code === 200) {
          Swal.fire({
            title: "Successfully Saved!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error Saved!",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin:", error);
        alert("Đã xảy ra lỗi khi cập nhật!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleButtonChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="StaffProfile-container">
      <div className="StaffProfile-top">
        <div className="Profile__infor__avatar">
          <label>
            <img
              className="Profile__infor__avatar__img"
              src={file || "./image/avatar-user/default-avatar-profile.png"}
              width={200}
              height={200}
              alt="Avatar"
            />
            <input
              type="file"
              id="fileInput"
              onChange={handleButtonChange}
              accept=".png, .webp, .jpeg, .jpg"
            />
            <button
              className="Profile__infor__avatar__btn"
              type="button"
              onClick={handleButtonClick}
            >
              <strong>CHOOSE IMAGE</strong>
            </button>
          </label>
        </div>
        <div className="staff-title">
          <div className="staff-name">Staff Account</div>
          <div className="staff__title-info">Position: {values.position}</div>
        </div>
      </div>
      <div className="Profile__infor__form">
        <form onSubmit={handleSubmit}>
          <div className="Profile__infor__Fullname">
            <label htmlFor="name">
              <strong>Full-Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              name="name"
              onChange={handleInput}
              value={values.name}
              className="form-control rounded-0"
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="Profile__infor__Email">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              disabled={true}
              onChange={handleInput}
              value={values.email}
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="Profile__infor__Address">
            <label htmlFor="address">
              <strong>Address</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              name="address"
              onChange={handleInput}
              value={values.address}
              className="form-control rounded-0"
            />
            {errors.address && (
              <span className="text-danger">{errors.address}</span>
            )}
          </div>
          <div className="Profile__infor__Phone">
            <label htmlFor="phone">
              <strong>Phone Number</strong>
            </label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              name="phone"
              onChange={handleInputPhone}
              value={values.phone}
              className="form-control rounded-0"
            />
            {errors.phone && (
              <span className="text-danger">{errors.phone}</span>
            )}
          </div>
          <button type="submit" className="Profile__infor__form__btn">
            <strong>Save</strong>
          </button>
        </form>
      </div>
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default AuthDetail;
