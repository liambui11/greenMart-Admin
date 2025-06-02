import { useCallback, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";
import Swal from "sweetalert2";
import "./Orders.css";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { FaRegEye } from "react-icons/fa6";

function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("All");

  const [orderData, setOrderData] = useState([
    {
      _id: "",
      customerName: "",
      createdAt: null,
      orderStatus: "",
      totalAmount: 0,
    },
  ]);

  const orderStatus = ["All", "Pending", "Success", "Cancel"];

  const handleAdminClick = () => {
    navigate(`/dashboard/overview`);
  };

  const handleOrderDetailClick = (id) => {
    navigate(`/dashboard/orders/orderdetail/${id}`);
  };

  const fetchData = useCallback(async () => {
    if (statusFilter === "All") {
      setIsLoading(true);
      try {
        const resData = await axiosInstanceStaff.get(`/api/v1/admin/orders`);
        console.log(resData.data);
        setOrderData(resData.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        const resData = await axiosInstanceStaff.get(
          `/api/v1/admin/orders?status=${statusFilter.toLowerCase()}`
        );
        console.log(resData.data);
        setOrderData(resData.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangeStatus = async (id) => {
    let selectedStatus = "";
    const choice = await Swal.fire({
      title: "Update Order Status",
      text: "What do you want to change the status to?",
      icon: "question",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Mark as Success",
      denyButtonText: "Mark as Cancelled",
      cancelButtonText: "Close",
    });

    if (choice.isConfirmed) {
      selectedStatus = "success";
      console.log("Order status updated: success");
    } else if (choice.isDenied) {
      selectedStatus = "cancel";
      console.log("Order status updated: cancel");
    } else {
      console.log("No status change");
      return;
    }

    const result = await Swal.fire({
      title: "Confirm Order Update",
      text: `Do you really want to update the order status to "${selectedStatus.toUpperCase()}"?`,
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Update",
      denyButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        const payload = { orderStatus: selectedStatus };

        const res = await axiosInstanceStaff.put(
          `/api/v1/admin/orders/status/${id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res.message);
        console.log("Success:", res.data);

        await Swal.fire(
          "Updated!",
          "The order status has been successfully updated.",
          "success"
        );
        await fetchData();
      } catch (error) {
        console.error("Response error:", error.response.data.errors);
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    } else if (result.isDenied) {
      Swal.fire("No Changes Made", "", "info");
    }
  };

  return (
    <div className="orders-container">
      <div className="orders">
        <div className="orders__title">
          <div className="orders__title--name">Orders</div>
        </div>
        <div className="orders__breadcrumb">
          <span onClick={handleAdminClick}>Admin</span>
          <FaChevronRight />
          <span>Orders</span>
        </div>
        <div className="orders__content">
          <input
            className="orders__content--search"
            type="text"
            placeholder="Search Order"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
          <select
            className="orders__content--select"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {orderStatus.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <table className="orders__content--table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Amount</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderData.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      fontWeight: "600",
                      color: "#2d6a4f",
                    }}
                  >
                    No invoices found
                  </td>
                </tr>
              ) : (
                orderData.map((item, index) => (
                  <tr key={index}>
                    <td>{item._id}</td>
                    <td>{item.customerName}</td>
                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })
                        : null}
                    </td>
                    <td>
                      <span className={getBadge(cap(item.orderStatus))}>
                        {cap(item.orderStatus)}
                      </span>
                    </td>
                    <td>${item.totalAmount}</td>
                    <td>
                      <FaRegEye
                        className="edit-icon"
                        onClick={() => handleOrderDetailClick(item._id)}
                      />
                    </td>
                    {item.orderStatus === "pending" && (
                      <td>
                        <LiaExchangeAltSolid
                          className="change-icon"
                          onClick={() => handleChangeStatus(item._id)}
                        />
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default Orders;

const getBadge = (status) => {
  switch (status) {
    case "Pending":
      return "orders-status--pending";
    case "Success":
      return "orders-status--success";
    case "Cancel":
      return "orders-status--cancel";
    default:
      return "";
  }
};

const cap = (str) => str[0]?.toUpperCase() + str.slice(1).toLowerCase();
