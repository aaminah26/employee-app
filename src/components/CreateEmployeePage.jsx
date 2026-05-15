import React, { useState } from "react";
import API from "../apis/client";
import { useNavigate } from "react-router-dom";

function CreateEmployeePage() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    department_id: "",
    designation: "",
    phone: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/employees/", data);

      navigate("/employees");

    } catch (err) {

      alert("Only admin can create employee");

    }
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>

        <h2>Create Employee</h2>

        <input
          placeholder="Name"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          placeholder="Department ID"
          onChange={(e) =>
            setData({ ...data, department_id: e.target.value })
          }
        />

        <input
          placeholder="Designation"
          onChange={(e) =>
            setData({ ...data, designation: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          onChange={(e) =>
            setData({ ...data, phone: e.target.value })
          }
        />

        <button type="submit">
  Create
</button>

<button
  type="button"
  onClick={() => navigate("/employees")}
>
  Cancel
</button>

      </form>

    </div>
  );
}

export default CreateEmployeePage;