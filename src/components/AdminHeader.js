import "./AdminHeader.css";
import { IoIosLogOut } from "react-icons/io";

function AdminHeader() {
  return (
    <div className="admin-header-container">
      <div className="admin-header">
        <div className="admin-header__user">
          <div className="admin-header__user--avatar">
            <img
              src="https://i.pinimg.com/736x/21/4e/c5/214ec5b7ba6a42481258e1d0c5bb60e1.jpg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(1.5)",
              }}
              alt="Admin Avatar"
            />
          </div>
          <div className="admin-header__user--name">Luan</div>
        </div>
        <div className="admin-header__log-out">
          <span>Log out</span>
          <IoIosLogOut />
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
