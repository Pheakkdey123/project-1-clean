
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetPassword(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Password reset email sent. Please check your email."
    );
  }

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h1>Forgot Password?</h1>

        <p>
          Enter your email address and we'll send you a password
          reset link.
        </p>

        <form
          className="forgot-form"
          onSubmit={handleResetPassword}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            className="forgot-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="forgot-message">
            {message}
          </p>
        )}

        <p className="forgot-login">
          Remember your password?{" "}
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;

