import { useEffect, useState } from "react";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";
import { LiaExchangeAltSolid } from "react-icons/lia";
import Swal from "sweetalert2";
import "./OrderDetail.css";

function OrderDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [currentOrderInfo, setCurrentOrderInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resData = await axiosInstanceStaff.get(
          `/api/v1/admin/orders/${orderId}`
        );
        console.log(resData.data);
        setCurrentOrderInfo(resData.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [orderId]);

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
        navigate(`/dashboard/orders`);
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
    <div className="order-detail-container">
      <div className="order-detail">
        <div className="order-detail__title">
          <div className="order-detail__title--name">Order Detail</div>
          <div className="order-detail__title--button">
            {/* {isEdit && (
              <div className="save-button" onClick={handleSave}>
                <LuSave />
                Save
              </div>
            )}

            {canEdit && (
              <div className="edit-button" onClick={() => setIsEdit(true)}>
                <CiEdit />
                Edit
              </div>
            )}
            <div
              className="back-button"
              onClick={() => navigate(`/dashboard/products`)}
            >
              <TbArrowBackUp />
              Back
            </div> */}
          </div>
        </div>
        <div className="order-detail__breadcrumb">
          <span onClick={() => navigate(`/dashboard/overview`)}>Admin</span>
          <FaChevronRight />
          <span onClick={() => navigate(`/dashboard/orders`)}>Orders</span>
          <FaChevronRight />
          <span>{currentOrderInfo.customerName}</span>
        </div>
        <div className="order-detail__content">
          <div className="order-detail__content--name">
            Order ID: #{currentOrderInfo?._id}
            <span className={getBadge(cap(currentOrderInfo?.orderStatus))}>
              {cap(currentOrderInfo?.orderStatus)}
            </span>
            {currentOrderInfo?.orderStatus === "pending" && (
              <div onClick={() => handleChangeStatus(currentOrderInfo?._id)}>
                <LiaExchangeAltSolid />
              </div>
            )}
          </div>
          <div className="order-detail__content--customer">
            User: <span>{currentOrderInfo?.customerName}</span>
          </div>
          <div className="order-detail__content--order-info">
            <div className="shipping-info">
              <div className="shipping-info__title">Shipping Information</div>
              <div className="shipping-info__content">
                <span>{currentOrderInfo?.customerInfor?.name}</span>
                <span>{currentOrderInfo?.customerInfor?.address}</span>
                <span>{currentOrderInfo?.customerInfor?.phone}</span>
              </div>
            </div>
            <div className="order-info">
              <div className="order-info__title">Order Details</div>
              <div className="order-info__content">
                <span>
                  Order Date:{" "}
                  <span>
                    {currentOrderInfo?.createdAt
                      ? new Date(currentOrderInfo?.createdAt).toLocaleString(
                          "vi-VN",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }
                        )
                      : null}
                  </span>
                </span>
                <span>
                  Order Total: <span>${currentOrderInfo?.totalAmount}</span>
                </span>
                <span>
                  Payment Method:{" "}
                  <span>
                    {currentOrderInfo?.orderPaymentMethod
                      ? currentOrderInfo.orderPaymentMethod.toUpperCase()
                      : ""}
                  </span>
                </span>
              </div>
            </div>
            <div className="order-admin">
              <div className="order-admin__title">Update By</div>
              <div className="order-admin__content">
                <span>{currentOrderInfo?.updatedBy?.staffID?.staffName}</span>
                <span>
                  {currentOrderInfo?.updatedBy?.date
                    ? new Date(
                        currentOrderInfo?.updatedBy?.date
                      ).toLocaleString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : null}
                </span>
              </div>
            </div>
          </div>
          <div className="order-detail__content--products-table">
            <table className="order-detail-products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(currentOrderInfo?.products) &&
                  currentOrderInfo.products.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          alt=""
                          src={
                            item.productImage === ""
                              ? "/image/logoGM.png"
                              : item.productImage
                          }
                          style={{
                            height: "4rem",
                            objectFit: "contain",
                          }}
                        />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.productPrice}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default OrderDetail;

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

const cap = (str) => {
  if (!str || typeof str !== "string") return "";
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};
