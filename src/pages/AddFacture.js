import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addFacture } from "../services/factureService";
import "../styles/Addfacture.css";
import Checkbox from "@mui/material/Checkbox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the arrow icon

const AddFacture = () => {
  const [invoice, setInvoice] = useState({
    description: "",
    date: "",
    montant: "",
    categorie: "",
    etat: "Unpaid", // Default value
  });
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Null for initial loading
  const navigate = useNavigate();

  const categories = ["Healthcare", "Transportation", "Housing", "Obligation"];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      etat: isChecked ? "Paid" : "Unpaid",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Invoice Data:", invoice);

    try {
      const response = await addFacture(invoice);
      console.log("Response:", response);

      alert("Invoice successfully added!");
      navigate("/facturesTable"); // Adjust the path if needed
    } catch (error) {
      console.error("Error adding invoice:", error.response?.data || error.message);
      alert("An error occurred while adding the invoice. Please try again.");
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  const styles = {
    container: { padding: "20px" },
    form: { maxWidth: "400px" },
    formGroup: { marginBottom: "15px" },
    input: { width: "100%", padding: "8px", marginTop: "5px" },
    button: {
      backgroundColor: "#435483",
      color: "white",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
    },
    backArrow: {
      position: 'absolute',
      left: '10px',
      top: '10px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      color: '#435483',
      marginTop:'20px',
      marginBottom: '20px',
    }
  };

  // Function to handle back arrow click
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className='add-facture-container'  style={styles.container}>
      <div
        className="back-arrow"
        onClick={handleBackClick}
        style={styles.backArrow}
      >
        <ArrowBackIcon style={{ marginRight: '5px' }} />
        
      </div>
      <h2>Add an Invoice</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={invoice.description}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="date">Due Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={invoice.date}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="montant">Montant:</label>
          <input
            type="number"
            id="montant"
            name="montant"
            value={invoice.montant}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="categorie">Categorie:</label>
          <select
            id="categorie"
            name="categorie"
            value={invoice.categorie}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select a category</option>
            {categories.map((categorie, index) => (
              <option key={index} value={categorie}>
                {categorie}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>
            <Checkbox
              checked={invoice.etat === "Paid"}
              onChange={handleCheckboxChange}
            />
            {invoice.etat === "Paid" ? "Paid" : "Unpaid"}
          </label>
        </div>

        <button type="submit" style={styles.button}>
          Add Invoice
        </button>
      </form>
    </div>
  );
};

export default AddFacture;
