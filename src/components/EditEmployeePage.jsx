import React, { useEffect, useState } from "react";
import API from "../apis/client";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployeePage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    department_id: "",
    designation: "",
    phone: "",
  });

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {

    try {

      const res = await API.get("/employees/");

      const employee = res.data.find(
        (emp) => emp.id === parseInt(id)
      );

      if (employee) {
        setData(employee);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.put(`/employees/${id}`, data);

      alert("Employee Updated Successfully");

      navigate("/employees");

    } catch (err) {

      alert("Update Failed");

    }
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>

        <h2>Edit Employee</h2>

        <input
          value={data.name}
          placeholder="Name"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          value={data.email}
          placeholder="Email"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          value={data.department_id}
          placeholder="Department ID"
          onChange={(e) =>
            setData({ ...data, department_id: e.target.value })
          }
        />

        <input
          value={data.designation}
          placeholder="Designation"
          onChange={(e) =>
            setData({ ...data, designation: e.target.value })
          }
        />

        <input
          value={data.phone}
          placeholder="Phone"
          onChange={(e) =>
            setData({ ...data, phone: e.target.value })
          }
        />

        <button type="submit">
          Update Employee
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

export default EditEmployeePage;