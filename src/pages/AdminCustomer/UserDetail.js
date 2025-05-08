import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import { TbArrowBackUp } from "react-icons/tb";
import { LuSave } from "react-icons/lu";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import "./UserDetail.css";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";
import ValidationUserDetail from "./ValidationUserDetail";

function CustomerDetail() {
  const navigateToAdmin = useNavigate();
  const navigateToCustomer = useNavigate();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstanceStaff.get(
          `/api/v1/admin/users/detail/${id}`
        );
        if (res.data.code === 200) {
          setUserData(res.data.info);
          // console.log("USER DATA:", res.data.info);
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleSave = async () => {
    // event.preventDefault();
    const validationErrors = ValidationUserDetail(userData);

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("userName", userData.userName.trim());
        formData.append("userPhone", userData.userPhone.trim());
        formData.append("userAddress", userData.userAddress.trim());
        formData.append("userStatus", userData.userStatus);
        if (file) {
          formData.append("userAvatar", file);
        }

        console.log("Form data being sent:");
        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
        const res = await axiosInstanceStaff.put(
          `/api/v1/admin/users/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        Swal.fire({
          title: error.response?.data?.message || "Server error occurred!",
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAdminClick = () => navigateToAdmin(`/`);
  const handleCustomerClick = () => navigateToCustomer(`/dashboard/user`);

  const handleButtonChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUserData((prevData) => ({
        ...prevData,
        userAvatar: URL.createObjectURL(selectedFile),
      }));
    }
  };

  if (!userData) return <OverlayLoading />;

  return (
    <div className="customer-detail-container">
      <div className="customer-detail">
        <div className="customer-detail__title">
          <div className="customer-detail__title--name">Customer Detail</div>
          <div className="customer-detail__title--button">
            {isEdit && (
              <div className="customer-save-button" onClick={handleSave}>
                <LuSave />
                Save
              </div>
            )}
            <div
              className="customer-edit-button"
              onClick={() => setIsEdit(true)}
            >
              <CiEdit />
              Edit
            </div>
            <div
              className="customer-back-button"
              onClick={() => navigateToCustomer(`/dashboard/user`)}
            >
              <TbArrowBackUp />
              Back
            </div>
          </div>
        </div>

        <div className="customer-detail__breadcrumb">
          <span onClick={handleAdminClick}>Admin</span>
          <FaChevronRight />
          <span onClick={handleCustomerClick}>Customer</span>
          <FaChevronRight />
          <span>{userData.userName}</span>
        </div>

        <div className="customer-detail__content">
          <label className="customer__image">
            Image
            <div className="customer__image--content">
              <img
                alt=""
                src={userData.userAvatar}
                style={{
                  width: "30rem",
                  height: "15rem",
                  objectFit: "contain",
                }}
              />
              {isEdit && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleButtonChange}
                  />
                  <label className="upload-icon" htmlFor="fileInput">
                    <FaCloudUploadAlt size="3rem" />
                  </label>
                </>
              )}
            </div>
          </label>
          <label className="customer__name">
            Name
            <input
              type="text"
              value={userData.userName}
              disabled={!isEdit}
              onChange={(e) =>
                setUserData({ ...userData, userName: e.target.value })
              }
            />
            {errors.userName && (
              <span className="text-danger">{errors.userName}</span>
            )}
          </label>
          <label className="customer-email">
            Email
            <input
              type="email"
              value={userData.userEmail}
              disabled={!isEdit}
              onChange={(e) =>
                setUserData({ ...userData, userEmail: e.target.value })
              }
            />
            {errors.userEmail && (
              <span className="text-danger">{errors.userEmail}</span>
            )}
          </label>

          <label className="customer__status">
            Status
            <div className="customer__status--group">
              <label>
                <input
                  type="radio"
                  value="active"
                  checked={userData.userStatus === "active"}
                  disabled={!isEdit}
                  onChange={(e) =>
                    setUserData({ ...userData, userStatus: e.target.value })
                  }
                />
                Active
              </label>
              <label className="">
                <input
                  type="radio"
                  value="inactive"
                  checked={userData.userStatus === "inactive"}
                  disabled={!isEdit}
                  onChange={(e) =>
                    setUserData({ ...userData, userStatus: e.target.value })
                  }
                />
                InActive
              </label>
            </div>
          </label>
          <label className="customer__phone">
            Number-Phone
            <input
              type="text"
              value={userData.userPhone}
              disabled={!isEdit}
              onChange={(e) =>
                setUserData({ ...userData, userPhone: e.target.value })
              }
            />
            {errors.userPhone && (
              <span className="text-danger">{errors.userPhone}</span>
            )}
          </label>
          <label className="customer__address">
            Address
            <input
              type="text"
              value={userData.userAddress}
              disabled={!isEdit}
              onChange={(e) =>
                setUserData({ ...userData, userAddress: e.target.value })
              }
            />
          </label>
          <label className="customer__create-by">
            Create By
            <input
              type="text"
              value={userData?.createBy}
              disabled={true}
            ></input>
          </label>
          <label className="customer__update-by">
            Update By
            <input
              type="text"
              value={userData?.updateBy}
              disabled={true}
            ></input>
          </label>

          <label className="customer__create-at">
            Create At
            <input
              type="text"
              value={
                userData.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString("vi-VN")
                  : "Null"
              }
              disabled
            />
          </label>
          <label className="customer__update-at">
            Update At
            <input
              type="text"
              value={
                userData.updatedAt
                  ? new Date(userData.updatedAt).toLocaleDateString("vi-VN")
                  : "Null"
              }
              disabled
            />
          </label>
        </div>
      </div>
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default CustomerDetail;
