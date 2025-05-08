import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useEffect, useState } from "react";
import ValidationStaff from "./MyProfileValidationStaff";
import "./StaffDetail.css";
import { FaChevronRight } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstanceStaff from "../../../untils/axiosInstanceStaff";
import { useNavigate, useParams } from "react-router-dom";
import OverlayLoading from "../../../components/OverlayLoading/OverlayLoading";
import { TbArrowBackUp } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";

function StaffDetail() {
  const navigateToAdmin = useNavigate();
  // const navigateToStaff = useNavigate();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigateToStaff = useNavigate();
  const [isEdit, setEdit] = useState(true);
  const { id } = useParams();

  const [staff, setStaff] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchStaff = async () => {
      try {
        const res = await axiosInstanceStaff.get(
          `/api/v1/admin/staffs/detail/${id}`
        );
        if (res.data.code === 200) {
          const user = res.data.info;
          setStaff(user);

          if (user.staffAvatar) {
            setFile(user.staffAvatar);
          }
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin staff:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchStaff();
    }
  }, [id]);

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;

    setStaff((prev) => ({
      ...prev,
      [name]: name === "roleID" ? { _id: value } : value,
    }));

    const fieldError = ValidationStaff({ ...staff, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError[name] ? fieldError[name] : undefined,
    }));
  };

  const handleInputPhone = (event) => {
    const onlyNums = event.target.value.replace(/\D/g, "");
    const validationErrors = ValidationStaff(staff);

    setErrors(validationErrors);
    setStaff((prev) => ({
      ...prev,
      [event.target.name]: onlyNums,
    }));
    const fieldError = ValidationStaff({
      ...staff,
      [event.target.name]: onlyNums,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [event.target.name]: fieldError[event.target.name]
        ? fieldError[event.target.name]
        : undefined,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = ValidationStaff(staff);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("staffName", staff.staffName.trim());
        formData.append("staffEmail", staff.staffEmail.trim());
        formData.append("staffPhone", staff.staffPhone.trim());
        formData.append("staffAddress", staff.staffAddress.trim());
        if (staff.staffPassword && staff.staffPassword.trim() !== "") {
          formData.append("staffPassword", staff.staffPassword);
        }
        formData.append("staffStatus", staff.staffStatus);
        formData.append("roleID", staff.roleID._id);

        const imageFile = document.getElementById("fileInput").files[0];
        if (imageFile) {
          formData.append("staffAvatar", imageFile);
        } else if (file && file !== staff.staffAvatar) {
          formData.append("staffAvatar", staff.staffAvatar);
        }

        // console.log("Form data being sent:", formData);

        const res = await axiosInstanceStaff.put(
          `/api/v1/admin/staffs/update/${id}`,
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
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Response error:", error.response);
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

  const handleAdminClick = () => navigateToAdmin(`/`);
  const handleStaffClick = () => navigateToStaff(`/dashboard/staff`);

  return (
    <div className="staffProfile-container">
      <div className="staffProfile__title">
        <div className="staffProfile__title--name">Staff Detail</div>
        <div className="staff-detail__breadcrumb">
          <span onClick={handleAdminClick}>Admin</span>
          <FaChevronRight />
          <span onClick={handleStaffClick}>Staff</span>
          <FaChevronRight />
          <span>{staff.staffName}</span>
        </div>
      </div>
      <div className="staffProfile-top">
        <div className="profile__infor__avatar">
          <label>
            <img
              className="profile__infor__avatar__img"
              src={file || "./image/avatar-user/default-avatar-profile.png"}
              width={200}
              height={200}
              alt="Avatar"
            />
            <input
              type="file"
              id="fileInput"
              disabled={isEdit}
              onChange={handleButtonChange}
              accept=".png, .webp, .jpeg, .jpg"
            />
            <button
              className={`profile__infor__avatar__btn ${
                isEdit ? "btn-disabled" : "btn-enabled"
              }`}
              type="button"
              disabled={isEdit}
              onClick={handleButtonClick}
            >
              <strong>CHOOSE IMAGE</strong>
            </button>
          </label>
        </div>
        <div className="staff-title">
          <div className="staff-name">Staff Account</div>
          <div className="staff-name">Detail</div>
        </div>
        <div className="staff__top-btn">
          <div
            className="staff-back mb-3"
            onClick={() => navigateToStaff(`/dashboard/staff`)}
          >
            <TbArrowBackUp />
            Back
          </div>
          <div className="staff-edit" onClick={(e) => setEdit(false)}>
            <CiEdit />
            Edit
          </div>
        </div>
      </div>
      <div className="profile__infor__form">
        <form onSubmit={handleSubmit}>
          <div className="profile__infor__fullname">
            <label htmlFor="name">
              <strong>Full-Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              name="staffName"
              disabled={isEdit}
              onChange={handleInput}
              value={staff.staffName}
              className="form-control rounded-3"
            />
            {errors.staffName && (
              <span className="text-danger">{errors.staffName}</span>
            )}
          </div>
          <div className="profile__infor__email">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="staffEmail"
              disabled={isEdit}
              onChange={handleInput}
              value={staff.staffEmail}
              className="form-control rounded-3"
            />
            {errors.staffEmail && (
              <span className="text-danger">{errors.staffEmail}</span>
            )}
          </div>
          <div className="profile__infor__address">
            <label htmlFor="address">
              <strong>Address</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              name="staffAddress"
              onChange={handleInput}
              disabled={isEdit}
              value={staff.staffAddress}
              className="form-control rounded-3"
            />
            {errors.staffAddress && (
              <span className="text-danger">{errors.staffAddress}</span>
            )}
          </div>
          <div className="profile__infor__phone">
            <label htmlFor="phone">
              <strong>Phone Number</strong>
            </label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              name="staffPhone"
              onChange={handleInputPhone}
              value={staff.staffPhone}
              disabled={isEdit}
              className="form-control rounded-3"
            />
            {errors.staffPhone && (
              <span className="text-danger">{errors.staffPhone}</span>
            )}
          </div>
          <div className="profile__infor__password">
            <label>
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="New Password"
              name="staffPassword"
              onChange={handleInput}
              value={staff.staffPassword}
              disabled={isEdit}
              className="form-control rounded-3"
            />
            {errors.staffPassword && (
              <span className="text-danger">{errors.staffPassword}</span>
            )}
          </div>

          <div className="profile__infor__position">
            <label>
              <strong>Position</strong>
            </label>
            <select
              name="roleID"
              onChange={handleInput}
              value={staff.roleID ? staff.roleID._id : ""}
              disabled={isEdit}
              className="form-control rounded-3"
            >
              <option value="6805b1186e7f1d812a163506">Admin</option>
              <option value="6805b1186e7f1d812a163507">Stock</option>
            </select>
          </div>
          <div className="staff__info__by">
            <label className="staff__create-by">
              <strong>Create By</strong>
              <input
                type="text"
                value={staff.createBy?.staffID?.staffName}
                disabled={true}
              ></input>
            </label>
            <label className="staff__update-by">
              <strong>Update By</strong>
              <input
                type="text"
                value={
                  Array.isArray(staff.updateBy) && staff.updateBy.length > 0
                    ? staff.updateBy[staff.updateBy.length - 1]?.staffID
                        ?.staffName
                    : ""
                }
                disabled={true}
              ></input>
            </label>
            <label className="staff__update-at">
              <strong>Update At</strong>
              <input
                type="text"
                value={
                  staff.updatedAt
                    ? new Date(staff.updatedAt).toLocaleDateString("vi-VN")
                    : "Null"
                }
                disabled={true}
              ></input>
            </label>
          </div>
          <div className="staff__at__status">
            <label className="staff__status">
              <strong>Status</strong>
              <div className="staff__status--group">
                <label>
                  <input
                    type="radio"
                    value="active"
                    checked={staff.staffStatus === "active"}
                    disabled={isEdit}
                    onChange={(e) =>
                      setStaff((prev) => ({
                        ...prev,
                        staffStatus: e.target.value,
                      }))
                    }
                  />
                  Active
                </label>
                <label>
                  <input
                    type="radio"
                    value="inactive"
                    checked={staff.staffStatus === "inactive"}
                    disabled={isEdit}
                    onChange={(e) =>
                      setStaff((prev) => ({
                        ...prev,
                        staffStatus: e.target.value,
                      }))
                    }
                  />
                  InActive
                </label>
              </div>
            </label>
          </div>
          <button
            type="submit"
            disabled={isEdit}
            className={`profile__infor__form__btn ${
              isEdit ? "btn-disabled" : "btn-enabled"
            }`}
          >
            <strong>Save</strong>
          </button>
        </form>
      </div>
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default StaffDetail;
