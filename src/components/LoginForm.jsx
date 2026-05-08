import React, { useState } from "react";
import API from "../apis/client";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.access_token);

      localStorage.setItem("role", res.data.role);

      navigate("/employees");

    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>

        <h2>Employee Management Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button type="submit">
          Login
        </button>

        <p>
          Don't have account?
          <Link to="/register"> Register</Link>
        </p>

      </form>

    </div>
  );
}

export default LoginForm;