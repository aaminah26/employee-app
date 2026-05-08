import React, { useState } from "react";
import API from "../apis/client";
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/auth/register", data);

      alert("Registered Successfully");

      navigate("/login");

    } catch (err) {

      alert("Registration Failed");

    }
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>

        <h2>Register</h2>

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
          Register
        </button>

        <p>
          Already have account?
          <Link to="/login"> Login</Link>
        </p>

      </form>

    </div>
  );
}

export default RegisterForm;