import AdminMenu from "./AdminMenu";
import "./AdminNav.css";
function AdminNav() {
  return (
    <div className="admin-nav-container">
      <div className="admin-nav">
        <div className="admin-nav__logo">
          <img alt="" src="/image/logoGM.png"></img>
          <span className="admin-nav__logo--title">Admin</span>
        </div>
        <div className="admin-nav__menu">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
