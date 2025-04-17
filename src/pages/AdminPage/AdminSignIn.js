import { useNavigate } from "react-router-dom";
import "./AdminSignIn.css";

function AdminSignIn() {
  const navigate = useNavigate(); // Đổi tên biến từ "navigation" thành "navigate"

  const handleLogin = (event) => {
    event.preventDefault(); // Ngăn form tải lại trang
    navigate("/AdminPage"); // Điều hướng đến trang Admin
  };

  return (
    <div className="admin-sign-in-container">
      <div className="admin-sign-in">
        <div className="admin-sign-in__logo">
          <img alt="Logo" src="/images/logo.png"></img>
          <span className="admin-sign-in__logo--title">Admin</span>
        </div>
        <form className="admin-sign-in__form">
          <div className="admin-sign-in__input-group">
            <label className="admin-sign-in__label" htmlFor="email">
              Email
            </label>
            <input
              className="admin-sign-in__input"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="admin-sign-in__input-group">
            <label className="admin-sign-in__label" htmlFor="password">
              Password
            </label>
            <input
              className="admin-sign-in__input"
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button className="admin-sign-in__button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignIn;
