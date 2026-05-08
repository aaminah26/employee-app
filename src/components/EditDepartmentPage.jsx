import React, { useEffect, useState } from "react";
import API from "../apis/client";
import { useNavigate, useParams } from "react-router-dom";

function EditDepartmentPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    location: "",
  });

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {

    try {

      const res = await API.get("/departments/");

      const department = res.data.find(
        (dep) => dep.id === parseInt(id)
      );

      if (department) {
        setData(department);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.put(`/departments/${id}`, data);

      alert("Department Updated Successfully");

      navigate("/departments");

    } catch (err) {

      alert("Update Failed");

    }
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>

        <h2>Edit Department</h2>

        <input
          value={data.name}
          placeholder="Department Name"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          value={data.location}
          placeholder="Location"
          onChange={(e) =>
            setData({ ...data, location: e.target.value })
          }
        />

        <button type="submit">
          Update Department
        </button>

      </form>

    </div>
  );
}

export default EditDepartmentPage;