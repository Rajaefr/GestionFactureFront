import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/HomePage";
import Login from "./components/LoginSignup/Login";
import ForgotPassword from "./pages/ForgotPasswrd";
import Dashboard from "./components/Dashboard";
import FacturesTable from "./pages/FacturesTable";
import AddFacture from "./pages/AddFacture";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // User is authenticated if token exists
    }
  }, []);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/login"
          element={<Login setAuth={setIsAuthenticated} />} // Pass setAuth to Login
        />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/FacturesTable" element={<PrivateRoute element={<FacturesTable />} />} />
        <Route path="/AddFacture" element={<PrivateRoute element={<AddFacture />} />} />
      </Routes>
    </Router>
  );
}

export default App;
