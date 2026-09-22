
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import { getPasswordStrength } from "../utils/passwordStrength";
import "../styles/Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordStrength = getPasswordStrength(password);

  async function handleSignup(e) {
    e.preventDefault();

    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Account created! Please check your email and confirm your account before logging in."
    );
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Sign Up</h1>

        <form className="signup-form" onSubmit={handleSignup}>
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

          {password && (
            <p className={`password-strength ${passwordStrength}`}>
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
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          {confirmPassword && password !== confirmPassword && (
            <p className="signup-password-error">
              Passwords do not match.
            </p>
          )}

          {confirmPassword && password === confirmPassword && (
            <p className="signup-password-match">
              Passwords match.
            </p>
          )}

          <button
            className="signup-button"
            type="submit"
            disabled={loading || password !== confirmPassword}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="signup-message">
            {message}
          </p>
        )}

        <p className="signup-login">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

