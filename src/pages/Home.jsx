
import { useState } from "react";
import { useAuth } from "../context/authContext";
import "../styles/Home.css";

function Home() {
  const { user, logout } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);

    const { error } = await logout();

    if (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
    }
  }

  return (
    <div className="home-page">
      <div className="home-card">
        <h1>Home</h1>

        {user && (
          <p>
            Welcome, <strong>{user.email}</strong>
          </p>
        )}

        <button
          className="logout-button"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Home;

