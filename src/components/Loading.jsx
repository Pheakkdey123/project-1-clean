
import "../styles/Loading.css";

function Loading() {
  return (
    <div
      className="loading-page"
      role="status"
      aria-label="Loading"
    >
      <div className="loading-spinner" />
    </div>
  );
}

export default Loading;

