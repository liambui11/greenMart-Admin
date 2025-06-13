import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import "./RecentOrders.css";
import { useNavigate } from "react-router-dom";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";

function RecentOrders() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [recentOrderData, setRecentOrderData] = useState([
    {
      _id: "",
      customerName: "",
      createdAt: null,
      orderStatus: "",
      totalAmount: 0,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resData = await axiosInstanceStaff.get(
          `/api/v1/admin/overview/order-today`
        );
        console.log(resData.data);
        setRecentOrderData(resData.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOrderDetailClick = (id) => {
    navigate(`/dashboard/orders/orderdetail/${id}`);
  };
  return (
    <div className="recent-orders-container">
      <div className="recent-orders">
        <div className="recent-orders__title">Recent Orders</div>
        <div className="recent-orders__content--table-container">
          <table className="recent-orders__content--table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentOrderData.length === 0 ? (
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
                recentOrderData.map((item, index) => (
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
                        className="view-icon"
                        onClick={() => handleOrderDetailClick(item._id)}
                      />
                    </td>
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

export default RecentOrders;

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
