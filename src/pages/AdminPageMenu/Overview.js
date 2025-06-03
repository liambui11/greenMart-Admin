import { useNavigate } from "react-router-dom";
import "./Overview.css";
import { FaChevronRight } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { useEffect, useState } from "react";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";
import Revenue from "./Revenue";

function Overview() {
  const [overviewData, setOverviewData] = useState();
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resData = await axiosInstanceStaff.get(
          `/api/v1/admin/overview/total`
        );
        setOverviewData(resData.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="over-view-container">
      <div className="over-view">
        <div className="over-view__title">Overview</div>
        <div className="over-view__breadcrumb">
          <span onClick={() => navigate(`/`)}>Admin</span>
          <FaChevronRight />
          <span>Overview</span>
        </div>
        <div className="over-view__content">
          <div className="over-view__content--cards">
            <div className="orders-report card">
              <div className="card-name">
                <div className="card-name__name">Orders</div>
                <div className="card-name__icon">
                  <IoCartOutline size={"4rem"} />
                </div>
              </div>
              <div className="card-quantity">{overviewData?.totalOrders}</div>
            </div>
            <div className="customer-report card">
              <div className="card-name">
                <div className="card-name__name">Customer</div>
                <div className="card-name__icon">
                  <FaRegUser size={"4rem"} />
                </div>
              </div>
              <div className="card-quantity">{overviewData?.totalUsers}</div>
            </div>
            <div className="product-report card">
              <div className="card-name">
                <div className="card-name__name">Products</div>
                <div className="card-name__icon">
                  <BsBoxSeam size={"4rem"} />
                </div>
              </div>
              <div className="card-quantity">{overviewData?.totalProducts}</div>
            </div>
          </div>
          <div className="over-view__content--revenue">
            <Revenue />
          </div>
          {/* <div className="over-view__content--recent-order">

          </div> */}
        </div>
      </div>
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default Overview;
