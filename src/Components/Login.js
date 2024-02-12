import React from "react";

const validateAccount = () => {
  return {};
};

const newAccount = () => {
  return {};
};

const Login = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-10">
      <img
        src="https://app.kaizntree.com/img/Kaizntree_Palm_Trees.147c8cb5.png"
        className="h-35 w-40 mb-4"
        alt="Company Logo"
      />
      <form onSubmit={(e) => e.preventDefault()} className="w-70% flex flex-col">
        <input
          type="text"
          placeholder="Username"
          className="border border-solid rounded-lg px-4 py-2 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-solid rounded-lg px-4 py-2 mb-2"
        />
        {/* Container for buttons */}
        <div className="flex justify-between">
          <button
            onClick={newAccount}
            className="border border-solid bg-gray-100 p-3"
          >
            Create Account
          </button>
          <button
            onClick={validateAccount}
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
