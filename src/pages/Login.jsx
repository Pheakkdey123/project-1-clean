
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });

    if (error) {
      setGoogleLoading(false);
      setMessage(error.message);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <Link
            to="/forgot-password"
            className="forgot-password"
          >
            Forgot password?
          </Link>

          <button
            className="login-button"
            type="submit"
            disabled={loading || googleLoading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center" }}>OR</p>

        <button
          className="google-button"
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
        >
          {googleLoading
            ? "Connecting to Google..."
            : "Continue with Google"}
        </button>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <p className="login-signup">
          Don't have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

