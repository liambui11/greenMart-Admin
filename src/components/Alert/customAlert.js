import React, { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
import "./customAlert.css";

const icons = {
  success: <FaCheckCircle />,
  error: <FaExclamationCircle />,
  warning: <FaExclamationTriangle />,
  info: <FaInfoCircle />,
};

const CustomAlert = ({ type = "info", message, onClose, duration = 2000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`custom-alert custom-alert-${type}`}>
      <div className="custom-alert-icon">{icons[type]}</div>
      <span className="custom-alert-message">{message}</span>
      <button className="custom-alert-close" onClick={onClose}>×</button>
    </div>
  );
};

export default CustomAlert;
