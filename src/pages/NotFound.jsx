
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="not-found-button"
        >
          Back to Welcome
        </Link>
      </div>
    </main>
  );
}

export default NotFound;

