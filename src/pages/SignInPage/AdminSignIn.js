import { useNavigate } from "react-router-dom";
import "./AdminSignIn.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStaff } from "../../actions/authStaff";
import { useAlert } from "../../context/AlertContext";

function AdminSignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const isAuthenticated = useSelector(
    (state) => state.staffAuth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/overview");
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email cannot be empty";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password cannot be empty";
    } else if (password.length <= 6) {
      newErrors.password = "Password must be more than 6 characters";
    }

    return newErrors;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      const result = await dispatch(loginStaff(email, password));

      if (result.success) {
        showAlert("success", "Admin login successful!");
        navigate("/dashboard/overview");
      } else {
        showAlert("error", result.message || "Login failed. Please try again.");
      }
    } else {
      setError(validationErrors);
    }
  };

  return (
    <div className="admin-sign-in-container">
      <div className="admin-sign-in">
        <div className="admin-sign-in__logo">
          <img alt="Logo" src="/image/logoGM.png"></img>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="admin-sign-in__error">{error.email}</p>}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="admin-sign-in__error">{error.password}</p>}
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
