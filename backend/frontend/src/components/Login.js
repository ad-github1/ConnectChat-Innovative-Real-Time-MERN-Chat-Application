import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");

  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mt-20 items-center">

      <input
        className="input input-bordered w-64 mb-2"
        placeholder="Username (for register)"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="input input-bordered w-64 mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input input-bordered w-64 mb-2"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn btn-primary w-64 mb-2"
        onClick={() => login(email, password).then(() => navigate("/chat"))}
      >
        Login
      </button>

      <button
        className="btn btn-secondary w-64"
        onClick={() => register(username, email, password)}
      >
        Register
      </button>
    </div>
  );
}
