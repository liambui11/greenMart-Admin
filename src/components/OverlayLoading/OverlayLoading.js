import "./OverlayLoading.css";

function OverlayLoading() {
  return (
    <div className="overlay-loading-container">
      <div className="overlay-loading">
        <div className="overlay-loading__logo">
          <img src="/image/favicon.png" alt="logo" />
        </div>
        <div className="overlay-loading__description">
          {" "}
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
}

export default OverlayLoading;
