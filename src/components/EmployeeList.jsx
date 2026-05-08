import React, { useEffect, useState } from "react";
import API from "../apis/client";
import { Link } from "react-router-dom";

function EmployeeList() {

  const [employees, setEmployees] = useState([]);

  const role = localStorage.getItem("role");

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

  return (
    <div className="page">

      <div className="topbar">

        <h1>Employees</h1>

        {role === "admin" && (
          <Link to="/employees/create">
            <button>Add Employee</button>
          </Link>
        )}

      </div>

      {employees.map((emp) => (

        <div className="card" key={emp.id}>

          <h3>{emp.name}</h3>

          <p>Email: {emp.email}</p>

          <p>Designation: {emp.designation}</p>

          <p>Phone: {emp.phone}</p>

          {role === "admin" && (
            <div className="actions">

              <Link to={`/employees/edit/${emp.id}`}>
                <button>Edit</button>
              </Link>

              <button onClick={() => deleteEmployee(emp.id)}>
                Delete
              </button>

            </div>
          )}

        </div>

      ))}

      <Link to="/departments">
        <button>Departments</button>
      </Link>

    </div>
  );
}

export default EmployeeList;