import { useEffect, useState } from "react";
import "./User.css";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate(`/`);
  };

  const handleCustomerClick = (item) => {
    navigate(`/dashboard/userdetail/${item._id}`, { state: { item } });
  };

  const handleDeleteCustomer = () => {
    alert("Da xoa");
  };

  const filteredCustomers = customer.filter(
    (item) =>
      item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstanceStaff.get("/api/v1/admin/users");
        console.log("Danh sách user:", res.data.info);
        setCustomer(res.data.info || []);
      } catch (err) {
        console.error("Lỗi:", err);
        setCustomer([]);
      }
    };

    fetchData();
  }, []);

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
          <input
            className="customer__content--search"
            type="text"
            placeholder="Customer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
              {filteredCustomers?.length > 0 ? (
                filteredCustomers.map((item) => (
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
                        onClick={handleDeleteCustomer}
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
    </div>
  );
}

export default Customer;
