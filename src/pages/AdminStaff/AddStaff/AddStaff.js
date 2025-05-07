import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useEffect, useState } from "react";
import ValidationStaff from "./ValidationAddStaff";
import "./AddStaff.css";

import Swal from "sweetalert2";
import axiosInstanceStaff from "../../../untils/axiosInstanceStaff";
// import { useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import OverlayLoading from "../../../components/OverlayLoading/OverlayLoading";
import { useNavigate } from "react-router-dom";

function AddStaff() {
  const navigateToStaff = useNavigate();
  const navigateToAdmin = useNavigate();

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //   const { id } = useParams();

  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    position: "",
    pass: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    // setValues((prev) => ({
    //   ...prev,
    //   [event.target.name]: event.target.value,
    // }));

    const { name, value } = event.target;

    // Xóa lỗi khi người dùng bắt đầu nhập
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputPhone = (event) => {
    const { name, value } = event.target;
    const onlyNums = value.replace(/\D/g, "");

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setValues((prevValues) => ({
      ...prevValues,
      [name]: onlyNums,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = ValidationStaff(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("staffName", values.name);
        formData.append("staffEmail", values.email);
        formData.append("staffAddress", values.address);
        formData.append("staffPhone", values.phone);
        formData.append("staffPassword", values.pass);
        formData.append("roleID", values.position);

        const imageFile = document.getElementById("fileInput").files[0];
        if (imageFile) {
          formData.append("staffAvatar", imageFile);
        }

        const res = await axiosInstanceStaff.post(
          "/api/v1/admin/staffs/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        Swal.fire({
          title: "Successfully Saved!",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
        });
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

  const handleAdminClick = () => navigateToAdmin(`/dashboard`);
  const handleStaffClick = () => navigateToStaff(`/dashboard/staff`);

  return (
    <div className="StaffProfile-container">
      <div className="StaffProfile__title">
        <div className="StaffProfile__title--name">Staff Add</div>
        <div className="customer-detail__breadcrumb">
          <span onClick={handleAdminClick}>Admin</span>
          <FaChevronRight />
          <span onClick={handleStaffClick}>Staff</span>
          <FaChevronRight />
          <span>{values.name}</span>
        </div>
      </div>
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
          <div className="staff-name">Add Staff Account</div>
          {/* <div className="staff__title-info">Position: {values.position}</div> */}
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
              //   disabled={true}
              onChange={handleInput}
              value={values.email}
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>

          <div className="Profile__infor__position">
            <label>
              <strong>Position</strong>
            </label>
            <select
              name="position"
              onChange={handleInput}
              value={values.position}
              className="form-control rounded-0"
            >
              <option value="">-- Select Position --</option>
              <option value="6805b1186e7f1d812a163506">Admin</option>
              <option value="6805b1186e7f1d812a163507">Stock</option>
            </select>
            {errors.position && (
              <span className="text-danger">{errors.position}</span>
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

          <div className="Profile__infor__pass">
            <label>
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="pass"
              onChange={handleInput}
              value={values.pass}
              className="form-control rounded-0"
            />
            {errors.pass && <span className="text-danger">{errors.pass}</span>}
          </div>

          <button type="submit" className="Profile__infor__form__btn">
            <strong>Save</strong>
          </button>
        </form>
      </div>
      {/* {isLoading && <OverlayLoading />} */}
    </div>
  );
}

export default AddStaff;
