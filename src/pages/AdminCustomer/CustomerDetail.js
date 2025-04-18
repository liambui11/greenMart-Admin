import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";
import './CustomerDetail.css'

function CustomerDetail() {
    const navigateToAdmin = useNavigate();
    const navigateToCustomer = useNavigate();
    const location = useLocation();
    const currentCustomer = location.state?.item;
    const [parentCustomer, setParentCustomer] = useState();
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          const resParentCustomer = await fetch(
            `http://localhost:3000/api/v1/users/all`
          );
          const parentCustomerJson = await resParentCustomer.json();
          setParentCustomer(parentCustomerJson.info);
        };
        fetchData();
      }, []);

    const handleAdminClick = () => {
        navigateToAdmin(`/`);
    };

    const handleCustomerClick = () => {
        navigateToCustomer(`/customer`);
    };

  return (
    <div className="customer-detail-container">
          <div className="customer-detail">
            <div className="customer-detail__title">Customer Detail</div>
            <div className="customer-detail__breadcrumb">
              <span onClick={handleAdminClick}>Admin</span>
              <FaChevronRight />
              <span onClick={handleCustomerClick}>Customer</span>
              <FaChevronRight />
              <span>{currentCustomer.userName}</span>
            </div>
            <div className="customer-detail__content">
              <label className="customer__name">
                Name
                <input
                  type="text"
                  value={currentCustomer.userName}
                  disabled={isEdit}
                ></input>
              </label>
              <label className="customer-email">
                Email
                <input
                  type="email"
                  value={
                    currentCustomer.userEmail
                  }
                  disabled={isEdit}
                ></input>
              </label>
              <label className="customer__image">
                Image
                <img
                  alt=""
                  src={currentCustomer.userAvatar}
                  style={{ width: "20rem", height: "12rem", objectFit: "contain" }}
                />
              </label>
              <label className="customer__status">
                Status
                <div className="customer__status--group">
                  <label>
                    <input
                      type="radio"
                      value="active"
                      checked={currentCustomer.userStatus === "active"}
                      disabled={isEdit}
                    ></input>
                    Active
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="inactive"
                      checked={currentCustomer.userStatus === "inactive"}
                      disabled={isEdit}
                    ></input>
                    InActive
                  </label>
                </div>
              </label>
              <label className="customer__phone">
                Number-Phone
                <input
                  type="text"
                  value={currentCustomer.userPhone}
                  disabled={isEdit}
                ></input>
              </label>
              <label className="customer__address">
                Address
                <input
                  type="text"
                  value={currentCustomer.userAddress}
                  disabled={isEdit}
                ></input>
              </label>
              {/* <label className="category__create-by">
                Create By
                <input
                  type="text"
                  value={currentCategory.createBy}
                  disabled={isEdit}
                ></input>
              </label> */}
              {/* <label className="category__update-by">
                Update By
                <input
                  type="text"
                  value={current.updateBy}
                  disabled={isEdit}
                ></input>
              </label> */}
              {/* <label className="category__delete-by">
                Delete By
                <input
                  type="text"
                  value={currentCategory.deleteBy}
                  disabled={isEdit}
                ></input>
              </label> */}
              <label className="customer__deleted">
                Deleted
                <div className="customer__deleted--group">
                  <label>
                    <input
                      type="radio"
                      value={true}
                      checked={currentCustomer.deleted === true}
                      disabled={isEdit}
                    ></input>
                    True
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={false}
                      checked={currentCustomer.deleted === false}
                      disabled={isEdit}
                    ></input>
                    False
                  </label>
                </div>
              </label>
              <label className="customer__delete-at">
                Delete At
                <input
                  type="text"
                  value={
                    currentCustomer.deletedAt
                      ? new Date(currentCustomer.deletedAt).toLocaleDateString(
                          "vi-VN"
                        )
                      : "Null"
                  }
                  disabled={isEdit}
                ></input>
              </label>
              <label className="customer__create-at">
                Create At
                <input
                  type="text"
                  value={
                    currentCustomer.createdAt
                      ? new Date(currentCustomer.createdAt).toLocaleDateString(
                          "vi-VN"
                        )
                      : "Null"
                  }
                  disabled={isEdit}
                ></input>
              </label>
              <label className="customer__update-at">
                Update At
                <input
                  type="text"
                  value={
                    currentCustomer.updatedAt
                      ? new Date(currentCustomer.updatedAt).toLocaleDateString(
                          "vi-VN"
                        )
                      : "Null"
                  }
                  disabled={isEdit}
                ></input>
              </label>
            </div>
          </div>
        </div>
  )
}

export default CustomerDetail