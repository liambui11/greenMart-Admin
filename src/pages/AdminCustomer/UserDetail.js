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

function CustomerDetail() {
  const navigateToAdmin = useNavigate();
  const navigateToCustomer = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // const [userStatus, setUserStatus] = useState("inactive");
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstanceStaff.get(
          `/api/v1/admin/users/detail/${id}`
        );
        if (res.data.code === 200) {
          setUserData(res.data.info);
          console.log("USER DATA:", res.data.info);
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleSave = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        setIsEdit(false);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleAdminClick = () => navigateToAdmin(`/`);
  const handleCustomerClick = () => navigateToCustomer(`/dashboard/user`);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          userAvatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
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
                    id="imageUpload"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <label className="upload-icon" htmlFor="imageUpload">
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
    </div>
  );
}

export default CustomerDetail;
