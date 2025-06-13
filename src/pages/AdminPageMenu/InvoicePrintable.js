// src/components/InvoicePrintable.js
import React from "react";
import "./InvoicePrintable.css";

function InvoicePrintable({ orderInfo }) {
  return (
    <div id="invoice-print">
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <img
          src="/image/logo.png"
          alt="Shop Logo"
          crossOrigin="anonymous"
          style={{ height: "60px" }}
        />
        <p className="invoice-printable__title--name">
          97 Man Thien St., Hiep Phu Ward, Thu Duc City, Ho Chi Minh City
        </p>
        <p className="invoice-printable__title--email">Greenmart@gmail.com</p>
        <p className="invoice-printable__title--phone">Hotline: 0123456789</p>
      </div>

      <div>
        <div className="invoice-printable__content--customer">
          User: <span>{orderInfo?.customerName}</span>
        </div>
        <div className="invoice-printable__content--order-info">
          <div className="shipping-info">
            <div className="shipping-info__title">Shipping Information</div>
            <div className="shipping-info__content">
              <span>{orderInfo?.customerInfor?.name}</span>
              <span>{orderInfo?.customerInfor?.address}</span>
              <span>{orderInfo?.customerInfor?.phone}</span>
            </div>
          </div>
          <div className="order-info">
            <div className="order-info__title">Order Details</div>
            <div className="order-info__content">
              <span>
                Order Date:{" "}
                <span>
                  {orderInfo?.createdAt
                    ? new Date(orderInfo?.createdAt).toLocaleString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : null}
                </span>
              </span>
              <span>
                Order Total: <span>${orderInfo?.totalAmount}</span>
              </span>
              <span>
                Payment Method:{" "}
                <span>
                  {orderInfo?.orderPaymentMethod
                    ? orderInfo.orderPaymentMethod.toUpperCase()
                    : ""}
                </span>
              </span>
            </div>
          </div>
          <div className="order-admin">
            <div className="order-admin__title">Update By</div>
            <div className="order-admin__content">
              <span>{orderInfo?.updatedBy?.staffID?.staffName}</span>
              <span>
                {orderInfo?.updatedBy?.date
                  ? new Date(orderInfo?.updatedBy?.date).toLocaleString(
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
            </div>
          </div>
        </div>
      </div>

      <table className="invoice-printable-products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orderInfo?.products) &&
            orderInfo.products.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{item.productPrice}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoicePrintable;
