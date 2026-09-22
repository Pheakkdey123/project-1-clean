
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { getPasswordStrength } from "../utils/passwordStrength";
import "../styles/ResetPassword.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const passwordStrength = getPasswordStrength(password);

  useEffect(() => {
    async function checkRecoverySession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setReady(true);
        return;
      }

      setMessage(
        "This password reset link is invalid or has expired."
      );
    }

    checkRecoverySession();
  }, []);

  async function handleResetPassword(e) {
    e.preventDefault();

    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password updated successfully.");

    setTimeout(async () => {
      await supabase.auth.signOut();

      navigate("/login", {
        replace: true,
      });
    }, 1500);
  }

  if (!ready) {
    return (
      <div className="reset-page">
        <div className="reset-card">
          <h1>Reset Password</h1>

          <p>
            {message || "Checking reset link..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-page">
      <div className="reset-card">
        <h1>Reset Password</h1>

        <form
          className="reset-form"
          onSubmit={handleResetPassword}
        >
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
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

          {password && (
            <p
              className={`password-strength ${passwordStrength}`}
            >
              Password strength:{" "}
              {passwordStrength === "weak"
                ? "Weak"
                : passwordStrength === "medium"
                  ? "Medium"
                  : "Strong"}
            </p>
          )}

          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            className="reset-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>
        </form>

        {message && (
          <p className="reset-message">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;

