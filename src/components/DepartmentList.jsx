import React, { useEffect, useState } from "react";
import API from "../apis/client";
import { Link } from "react-router-dom";

function DepartmentList() {

  const [departments, setDepartments] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {

    try {

      const res = await API.get("/departments/");

      setDepartments(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const deleteDepartment = async (id) => {

    try {

      await API.delete(`/departments/${id}`);

      fetchDepartments();

    } catch (err) {

      alert("Only admin can delete department");

    }
  };

  return (
    <div className="page">

      <div className="topbar">

        <h1>Departments</h1>

        {role === "admin" && (
          <Link to="/departments/create">
            <button>Add Department</button>
          </Link>
        )}

      </div>

      {departments.map((dep) => (

        <div className="card" key={dep.id}>

          <h3>{dep.name}</h3>

          <p>Location: {dep.location}</p>

          {role === "admin" && (
            <div className="actions">

              <Link to={`/departments/edit/${dep.id}`}>
                <button>Edit</button>
              </Link>

              <button
  onClick={() => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (confirmDelete) {
      deleteDepartment(dep.id);
    }
  }}
>
  Delete
</button>

            </div>
          )}

        </div>

      ))}

    </div>
  );
}

export default DepartmentList;