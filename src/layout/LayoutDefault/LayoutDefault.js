import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminNav from "../../components/AdminNav";
import AdminHeader from "../../components/AdminHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./LayoutDefault.css";

function LayoutDefault() {
  const [isMenuToggleOpen, setMenuToggleOpen] = useState(false);
  const setToggle = () => setMenuToggleOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setMenuToggleOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="layout-default-container">
      <div className="layout-default">
        <div className="layout-default__header">
          <div
            className="layout-default__header--menu-toggle"
            onClick={setToggle}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
          <AdminHeader />
        </div>
        <div
          className={`layout-default__content ${
            isMenuToggleOpen ? "menu-open" : ""
          }`}
        >
          {!isMenuToggleOpen && <Outlet />}
        </div>
        <div
          className={`layout-default__nav ${isMenuToggleOpen ? "open" : ""}`}
        >
          <AdminNav />
        </div>
      </div>
    </div>
  );
}

export default LayoutDefault;
