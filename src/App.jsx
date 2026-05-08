import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import EmployeeList from "./components/EmployeeList";
import DepartmentList from "./components/DepartmentList";
import CreateEmployeePage from "./components/CreateEmployeePage";
import CreateDepartmentPage from "./components/CreateDepartmentPage";
import EditEmployeePage from "./components/EditEmployeePage";
import EditDepartmentPage from "./components/EditDepartmentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/create" element={<CreateEmployeePage />} />
        <Route path="/employees/edit/:id" element={<EditEmployeePage />} />

        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/departments/create" element={<CreateDepartmentPage />} />
        <Route path="/departments/edit/:id" element={<EditDepartmentPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;