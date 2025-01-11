import React, { useState } from "react";
import "../../styles/Login.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import UserServices from "../../services/userService";

const Login = ({ setAuth }) => { // Receive setAuth from App.js
  const [action, setAction] = useState("Sign In");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async () => {
    try {
      if (action === "Sign In") {
        const token = await UserServices.login(username, password);
        console.log("Logged in successfully:", token);
        setError("");
        // Save token in localStorage
        localStorage.setItem("authToken", token);
        
        setAuth(true); // Update the authentication state in App.js

        // Navigate to the dashboard page after successful login
        navigate("/Dashboard");
      } else {
        const message = await UserServices.register(username, email, password);
        console.log(message);
        setError("");
        setAction("Sign In"); // Switch to login after registration
      }
    } catch (err) {
      setError(err.message); // Ensure error message is displayed properly
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="user_icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="email_icon" />
          <input
            type="text"
            placeholder={action === "Sign In" ? "Username" : "Email"}
            value={action === "Sign In" ? username : email}
            onChange={(e) =>
              action === "Sign In"
                ? setUsername(e.target.value)
                : setEmail(e.target.value)
            }
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="password_icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="submit-container">
        {action === "Sign Up" ? (
          <>
            <div className="submit gray" onClick={() => setAction("Sign In")}>
              Sign In
            </div>
            <div className="submit" onClick={handleSubmit}>
              Sign Up
            </div>
          </>
        ) : (
          <>
            <div className="submit gray" onClick={() => setAction("Sign Up")}>
              Sign Up
            </div>
            <div className="submit" onClick={handleSubmit}>
              Sign In
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
