
import { Link } from "react-router-dom";
import "../styles/Welcome.css";

function Welcome() {
  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1>Welcome</h1>

        <p>Welcome to Project 1</p>

        <div className="welcome-buttons">
          <Link to="/login">Login</Link>

          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

