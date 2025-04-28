import "./AdminHeader.css";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutStaff } from "../actions/authStaff";
import { useState, useEffect } from "react";
import axiosInstanceStaff from "../untils/axiosInstanceStaff";

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstanceStaff.get("/api/v1/admin/auth/detail");
        if (res.data.code === 200) {
          setUser(res.data.info);
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin user:", err);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    dispatch(logoutStaff());
    navigate("/dashboard/signin");
  };

  const handleProfileAuth = () => {
    navigate("/dashboard/authdetail");
  };

  return (
    <div className="admin-header-container">
      <div className="admin-header">
        <div className="admin-header__user">
          <div
            className="admin-header__user--avatar"
            onClick={handleProfileAuth}
          >
            <img
              src={user.staffAvatar}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(1.5)",
              }}
              alt="Admin Avatar"
            />
          </div>
          <div className="admin-header__user--name">{user.staffName}</div>
        </div>
        <div className="admin-header__log-out" onClick={handleLogout}>
          <span>Log out</span>
          <IoIosLogOut />
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
