import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import "./Staff.css";
import { useNavigate } from "react-router-dom";

function Staff() {
  const [staff, setStaff] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const axiosData = async () => {
      try {
        const res = await axiosInstanceStaff.get("/api/v1/admin/staffs");
        console.log("admin staffs", res.data.info);
        setStaff(res.data.info || []);
      } catch (err) {
        alert("Loi:", err);
        setStaff([]);
      }
    };
    axiosData();
  }, []);

  const handleStaffdetail = (item) => {
    navigate(`/dashboard/staffdetail/${item._id}`);
  };

  const handleAddStaff = (item) => {
    navigate(`/dashboard/addstaff`);
  };

  return (
    <div className="staff-container">
      <div className="staff">
        <div className="staff__top">
          <div className="staff__title">Staff</div>
          <div className="staff__add" onClick={handleAddStaff}>
            Add Staff
          </div>
        </div>
        <div className="staff__breadcrumb">
          <span>Admin</span>
          <FaChevronRight />
          <span>Staff</span>
        </div>
        <div className="staff__content">
          <input
            className="staff__content--search"
            type="text"
            placeholder="Staff Searching ..."
          />
          <table className="staff__content--table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {staff?.length > 0 ? (
                staff.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <img
                        alt=""
                        src={item.staffAvatar}
                        style={{ height: "4rem", objectFit: "contain" }}
                      />
                    </td>
                    <td>{item.staffName}</td>
                    <td>{item.staffEmail}</td>
                    <td>{item.staffPhone}</td>
                    <td>{item.roleID.roleName}</td>
                    <td>{item.staffStatus}</td>
                    <td>
                      <CiEdit
                        className="staff__edit-icon"
                        onClick={() => handleStaffdetail(item)}
                      />
                    </td>
                    <td>
                      <MdOutlineDeleteOutline
                        className="staff__delete-icon"
                        // onClick={handleDeleteCustomer}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    No Staff.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Staff;
