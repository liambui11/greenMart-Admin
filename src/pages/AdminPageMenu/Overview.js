import { useNavigate } from "react-router-dom";
import "./Overview.css";
import { FaChevronRight } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { useSelector } from "react-redux";

function Overview() {
  const navigate = useNavigate();
  const info = useSelector((state)=>state.staffAuth.staffInfo);
  console.log(info)
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
              <div className="card-quantity">1313</div>
            </div>
            <div className="customer-report card">
              <div className="card-name">
                <div className="card-name__name">Customer</div>
                <div className="card-name__icon">
                  <FaRegUser size={"4rem"} />
                </div>
              </div>
              <div className="card-quantity">200</div>
            </div>
            <div className="product-report card">
              <div className="card-name">
                <div className="card-name__name">Products</div>
                <div className="card-name__icon">
                  <BsBoxSeam size={"4rem"} />
                </div>
              </div>
              <div className="card-quantity">100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
