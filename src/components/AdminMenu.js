import { NavLink } from "react-router-dom";
import "./AdminMenu.css";
import useCheckRole from "./CheckRole";
import { LiaChartBarSolid } from "react-icons/lia";
import { BiCategory } from "react-icons/bi";
import { FiShoppingBag, FiUser, FiUsers } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

const Divider = () => {
  return (
    <div
      style={{
        width: "23rem",
        height: "0.05rem",
        backgroundColor: "#0000009e",
        margin: "0.75rem 0",
      }}
    ></div>
  );
};

function AdminMenu() {
  const canViewCategory = useCheckRole("category", "view");
  const canViewProduct = useCheckRole("product", "view");
  const canViewOrder = useCheckRole("order", "view");
  const canViewStaff = useCheckRole("staff", "view");
  const canViewUser = useCheckRole("user", "view");

  return (
    <div className="admin-menu-container">
      <div className="admin-menu">
        <div className="admin-menu__title">MENU</div>
        <div className="admin-menu__items">
          <NavLink
            to={`/dashboard/overview`}
            className={({ isActive }) =>
              `admin-menu__items--over-view ${isActive ? "active" : ""}`
            }
          >
            <LiaChartBarSolid size="2.5rem" style={{ marginRight: "2rem" }} />{" "}
            Overview
          </NavLink>
          <Divider />
          {canViewCategory && (
            <NavLink
              to={`/dashboard/productcategories`}
              className={({ isActive }) =>
                `admin-menu__items--product-categories ${
                  isActive ? "active" : ""
                }`
              }
            >
              <BiCategory size="2.5rem" style={{ marginRight: "2rem" }} />
              Product Categories
            </NavLink>
          )}
          {canViewProduct && (
            <NavLink
              to={`/dashboard/products`}
              className={({ isActive }) =>
                `admin-menu__items--products ${isActive ? "active" : ""}`
              }
            >
              <FiShoppingBag size="2.5rem" style={{ marginRight: "2rem" }} />
              Products
            </NavLink>
          )}
          {canViewOrder && (
            <NavLink
              to={`/dashboard/orders`}
              className={({ isActive }) =>
                `admin-menu__items--orders ${isActive ? "active" : ""}`
              }
            >
              <LiaFileInvoiceDollarSolid
                size="2.5rem"
                style={{ marginRight: "2rem" }}
              />
              Orders
            </NavLink>
          )}
          {/* <NavLink
            to={`/dashboard/rolesgroup`}
            className={({ isActive }) =>
              `admin-menu__items--role-groups ${isActive ? "active" : ""}`
            }
          >
            Roles Groups
          </NavLink> */}
          {/* <NavLink
            to={`/AdminPage/Permission`}
            className={({ isActive }) =>
              `admin-menu__items--permissions ${isActive ? "active" : ""}`
            }
          >
            Permissions
          </NavLink>
          <NavLink
            to={`/dashboard/staff`}
            className={({ isActive }) =>
              `admin-menu__items--staff ${isActive ? "active" : ""}`
            }
          >
            Staff
          </NavLink>
          <NavLink
            to={`/dashboard/user`}
            className={({ isActive }) =>
              `admin-menu__items--customers ${isActive ? "active" : ""}`
            }
          >
            Customers
          </NavLink>
          </NavLink> */}
          {canViewStaff && (
            <NavLink
              to={`/dashboard/staff`}
              className={({ isActive }) =>
                `admin-menu__items--staff ${isActive ? "active" : ""}`
              }
            >
              <FiUser size="2.5rem" style={{ marginRight: "2rem" }} />
              Staff
            </NavLink>
          )}
          {canViewUser && (
            <NavLink
              to={`/dashboard/user`}
              className={({ isActive }) =>
                `admin-menu__items--customers ${isActive ? "active" : ""}`
              }
            >
              <FiUsers size="2.5rem" style={{ marginRight: "2rem" }} />
              Users
            </NavLink>
          )}
          {/* <Divider />
          <NavLink
            to={`/AdminPage/GeneralSetting`}
            className={({ isActive }) =>
              `admin-menu__items--general-settings ${isActive ? "active" : ""}`
            }
          >
            <IoSettingsOutline size="2.5rem" style={{ marginRight: "2rem" }} />
            General Settings
          </NavLink> */}
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
