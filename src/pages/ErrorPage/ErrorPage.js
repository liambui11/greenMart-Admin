import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdWrongLocation } from "react-icons/md";
import "./ErrorPage.css";

function ErrorPage() {
  const handleHomeButton = useNavigate();
  return (
    <div className="error-page-container">
      <div className="error-page">
        <div className="error-page__logo">
          <div className="error-page__logo--image">
            <img alt="" src="/image/logoGM.png"></img>
          </div>
          <div className="error-page__logo--title">404 ERROR</div>
        </div>
        <div className="error-page__description">
          <MdWrongLocation
            style={{ marginRight: "0.7rem", color: "#006838" }}
          />
          Oops! Looks like you’ve wandered into the wrong aisle...
        </div>
        <div className="error-page__button">
          <button onClick={() => handleHomeButton("/dashboard/overview")}>
            <FaHome style={{ marginRight: "0.7rem" }} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
