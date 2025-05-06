import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

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
  return (
    <div className="admin-menu-container">
      <div className="admin-menu">
        <div className="admin-menu__title">MENU</div>
        <div className="admin-menu__items">
          <NavLink
            to={`/overview`}
            className={({ isActive }) =>
              `admin-menu__items--over-view ${isActive ? "active" : ""}`
            }
          >
            Overview
          </NavLink>
          <Divider />
          <NavLink
            to={`/productcategories`}
            className={({ isActive }) =>
              `admin-menu__items--product-categories ${isActive ? "active" : ""}`
            }
          >
            Product Categories
          </NavLink>
          <NavLink
            to={`/dashboard/products`}
            className={({ isActive }) =>
              `admin-menu__items--products ${isActive ? "active" : ""}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to={`/promotions`}
            className={({ isActive }) =>
              `admin-menu__items--promotions ${isActive ? "active" : ""}`
            }
          >
            Promotions
          </NavLink>
          <NavLink
            to={`/rolesgroup`}
            className={({ isActive }) =>
              `admin-menu__items--role-groups ${isActive ? "active" : ""}`
            }
          >
            Roles Groups
          </NavLink>
          <NavLink
            to={`/AdminPage/Permission`}
            className={({ isActive }) =>
              `admin-menu__items--permissions ${isActive ? "active" : ""}`
            }
          >
            Permissions
          </NavLink>
          <NavLink
            to={`/AdminPage/Staff`}
            className={({ isActive }) =>
              `admin-menu__items--staff ${isActive ? "active" : ""}`
            }
          >
            Staff
          </NavLink>
          <NavLink
            to={`/customer`}
            className={({ isActive }) =>
              `admin-menu__items--customers ${isActive ? "active" : ""}`
            }
          >
            Customers
          </NavLink>
          <Divider />
          <NavLink
            to={`/AdminPage/GeneralSetting`}
            className={({ isActive }) =>
              `admin-menu__items--general-settings ${isActive ? "active" : ""}`
            }
          >
            General Settings
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
