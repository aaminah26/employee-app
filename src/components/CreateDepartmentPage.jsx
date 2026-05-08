import React, { useState } from "react";
import API from "../apis/client";
import { useNavigate } from "react-router-dom";

function CreateDepartmentPage() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    location: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/departments/", data);

      navigate("/departments");

    } catch (err) {

      alert("Only admin can create department");

    }
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>

        <h2>Create Department</h2>

        <input
          placeholder="Department Name"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          placeholder="Location"
          onChange={(e) =>
            setData({ ...data, location: e.target.value })
          }
        />

        <button type="submit">
          Create
        </button>

      </form>

    </div>
  );
}

export default CreateDepartmentPage;