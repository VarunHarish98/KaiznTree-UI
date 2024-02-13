import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // State for username and password inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Validation function for username and password
  const validateInputs = () => {
    // Validate username and password here
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter both username and password.");
      return false;
    }
    return true;
  };

  // Handle login function
  const handleLogin = () => {
    if (validateInputs()) {
      // Perform account validation
      if (validateAccount()) {
        // Navigate to the dashboard page
        navigate("/dashboard");
      } else {
        alert("Invalid username or password.");
      }
    }
  };

  // Mock validation function for demonstration
  const validateAccount = () => {
    // Perform account validation
    // For demonstration purposes, assume the validation is successful
    return true;
  };

  // Handle creation of a new account
  const handleCreateAccount = () => {
    if (validateInputs()) {
      // Perform account creation
      if (createAccount()) {
        alert("Account created successfully!");
      } else {
        alert("Failed to create account.");
      }
    }
  };

  // Mock function for creating a new account
  const createAccount = () => {
    // Perform account creation
    // For demonstration purposes, assume the account creation is successful
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen p-10">
      <img
        src="https://app.kaizntree.com/img/Kaizntree_Palm_Trees.147c8cb5.png"
        className="h-35 w-40 mb-4"
        alt="Company Logo"
      />
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
        <input
          type="text"
          placeholder="Username"
          className="border border-solid rounded-lg px-4 py-2 mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-solid rounded-lg px-4 py-2 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            onClick={handleCreateAccount}
            className="border border-solid bg-gray-100 p-3"
          >
            Create Account
          </button>
          <button
            onClick={handleLogin} // Call handleLogin function on button click
            className="border border-solid bg-gray-100 p-3"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
