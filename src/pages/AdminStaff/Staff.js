import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import "./Staff.css";
import { useNavigate } from "react-router-dom";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";
import Swal from "sweetalert2";

function Staff() {
  const [staff, setStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("userName");
  const [sortValue, setSortValue] = useState("desc");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const axiosData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstanceStaff.get("/api/v1/admin/staffs", {
          params: {
            keyword: searchQuery,
            sortKey: sortKey,
            sortValue: sortValue,
          },
        });
        console.log("admin staffs", res.data.info);
        setStaff(res.data.info || []);
      } catch (err) {
        alert("Loi:", err);
        setStaff([]);
      } finally {
        setIsLoading(false);
      }
    };
    axiosData();
  }, [searchQuery, sortKey, sortValue]);

  const handleStaffdetail = (item) => {
    navigate(`/dashboard/staff/staffdetail/${item._id}`);
  };

  const handleAddStaff = (item) => {
    navigate(`/dashboard/staff/addstaff`);
  };

  const handleDeleteStaff = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are deleting ${item.name || "this staff"}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstanceStaff.delete(
          `api/v1/admin/staffs/delete/${item._id}`
        );
        setStaff((prev) => prev.filter((s) => s._id !== item._id));
        Swal.fire({
          title: "Deleted!",
          text: "Staff deleted successfully.",
          icon: "success",
        });
      } catch (error) {
        console.error("Delete staff error:", error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Failed to delete staff.",
          icon: "error",
        });
      }
    }
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchQuery(e.target.search.value);
            }}
          >
            <input
              className="staff__content--search"
              type="text"
              placeholder="Staff Searching ..."
              name="search"
              defaultValue={searchQuery}
            />
            <button type="submit" className="staff__content__btn__submit">
              Search
            </button>
          </form>

          <table className="staff__content--table">
            <thead>
              <tr>
                {/* <th>
                  <input type="checkbox" />
                </th> */}
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {staff?.length > 0 ? (
                staff.map((item) => (
                  <tr key={item._id}>
                    {/* <td>
                      <input type="checkbox" />
                    </td> */}
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
                        className="staff__edit__icon"
                        onClick={() => handleStaffdetail(item)}
                      />
                    </td>
                    <td>
                      <MdOutlineDeleteOutline
                        className="staff__delete__icon"
                        onClick={() => handleDeleteStaff(item)}
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
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default Staff;
