import { useEffect, useState } from "react";
import "./User.css";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";
import Swal from "sweetalert2";

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("userName");
  const [sortValue, setSortValue] = useState("desc");

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstanceStaff.get("/api/v1/admin/users", {
          params: {
            keyword: searchQuery,
            sortKey: sortKey,
            sortValue: sortValue,
          },
        });

        setCustomer(res.data.info || []);
      } catch (err) {
        console.error("Lỗi:", err);
        setCustomer([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, sortKey, sortValue]);

  const handleAdminClick = () => {
    navigate(`/`);
  };

  const handleCustomerClick = (item) => {
    navigate(`/dashboard/userdetail/${item._id}`, { state: { item } });
  };

  const handleDeleteCustomer = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are deleting ${item.name || "this user"}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstanceStaff.delete(
          `api/v1/admin/users/delete/${item._id}`
        );
        setCustomer((prev) => prev.filter((s) => s._id !== item._id));
        Swal.fire({
          title: "Deleted!",
          text: "User deleted successfully.",
          icon: "success",
        });
      } catch (error) {
        console.error("Delete user error:", error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Failed to delete staff.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="customer-container">
      <div className="customer">
        <div className="customer__title">Customer</div>
        <div className="customer__breadcrumb">
          <span onClick={handleAdminClick}>Admin</span>
          <FaChevronRight />
          <span>Customer</span>
        </div>
        <div className="customer__content">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchQuery(e.target.search.value);
            }}
          >
            <input
              className="customer__content--search"
              type="text"
              placeholder="Customer Searching ..."
              defaultValue={searchQuery}
              name="search"
            />
            <button className="customer__content__btn__submit">Search</button>
          </form>
          <table className="customer__content--table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Create At</th>
                <th>Update At</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customer?.length > 0 ? (
                customer.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <img
                        alt=""
                        src={item.userAvatar}
                        style={{ height: "4rem", objectFit: "contain" }}
                      />
                    </td>
                    <td>{item.userName}</td>
                    <td>{item.userEmail}</td>
                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("vi-VN")
                        : ""}
                    </td>
                    <td>
                      {item.updatedAt
                        ? new Date(item.updatedAt).toLocaleDateString("vi-VN")
                        : ""}
                    </td>
                    <td>
                      <span className="customer-status">{item.userStatus}</span>
                    </td>
                    <td>
                      <CiEdit
                        className="edit-icon"
                        onClick={() => handleCustomerClick(item)}
                      />
                    </td>
                    <td>
                      <MdOutlineDeleteOutline
                        className="delete-icon"
                        onClick={() => handleDeleteCustomer(item)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    No Customers.
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

export default Customer;
