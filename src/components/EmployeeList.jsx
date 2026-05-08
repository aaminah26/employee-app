import React, { useEffect, useState } from "react";
import API from "../apis/client";
import { Link, useNavigate } from "react-router-dom";

function EmployeeList() {

  const [employees, setEmployees] = useState([]);

  const role = localStorage.getItem("role");

  const username = localStorage.getItem("username");

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {

    try {

      const res = await API.get("/employees/");

      setEmployees(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const deleteEmployee = async (id) => {

    try {

      await API.delete(`/employees/${id}`);

      fetchEmployees();

    } catch (err) {

      alert("Only admin can delete employee");

    }
  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    navigate("/login");
  };

  return (
    <div className="page">

      <div className="topbar">

        <h1>Employees</h1>

        <div style={{ display: "flex", gap: "10px" }}>

          {role === "admin" && (
            <Link to="/employees/create">
              <button>Add Employee</button>
            </Link>
          )}

          <Link to="/departments">
            <button>Departments</button>
          </Link>

          <button onClick={logout}>
            Logout
          </button>

        </div>

      </div>

      {employees.map((emp) => (

        <div className="card" key={emp.id}>

          <h3>{emp.name}</h3>

          <p>Email: {emp.email}</p>

          <p>Designation: {emp.designation}</p>

          <p>Department ID: {emp.department_id}</p>

          <p>Phone: {emp.phone}</p>

          <div className="actions">

            {/* ADMIN CONTROLS */}
            {role === "admin" && (
              <>
                <Link to={`/employees/edit/${emp.id}`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => deleteEmployee(emp.id)}>
                  Delete
                </button>
              </>
            )}

            {/* EMPLOYEE CAN EDIT ONLY OWN PROFILE */}
            {role === "user" && emp.name === username && (
              <Link to={`/employees/edit/${emp.id}`}>
                <button>Edit Profile</button>
              </Link>
            )}

          </div>

        </div>

      ))}

    </div>
  );
}

export default EmployeeList;