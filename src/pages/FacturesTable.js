import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteFacture } from "../services/factureService"; // Import deleteFacture service
import axios from "axios"; // Import axios for HTTP requests
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the arrow icon
import "../styles/FacturesTable.css";

const FacturesTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null); // Add state for error handling
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all invoices from the backend with authorization
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Retrieve access token from localStorage
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("http://localhost:8080/api/factures", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });

        setInvoices(response.data);
      } catch (err) {
        console.error("Error fetching invoices:", err);
        setError(err.message); // Set the error message
      }
    };

    fetchInvoices();
  }, []);

  const handleDeleteInvoice = async (id) => {
    try {
      await deleteFacture(id); // Call deleteFacture API to delete the facture
      const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
      setInvoices(updatedInvoices); // Update the state with the remaining invoices
      alert("Facture supprimée avec succès!");
    } catch (err) {
      console.error("Erreur lors de la suppression de la facture:", err);
      setError("Erreur lors de la suppression de la facture.");
    }
  };

  const addPayment = (id) => {
    navigate(`/AddPaiement/${id}`);
  };

  const goToDetails = (id) => {
    navigate(`/DetailsFacture/${id}`);
  };

  const goUpdate = (id) => {
    navigate(`/UpdateFacture/${id}`);
  };

  // Filter invoices by category
  const filteredInvoices = invoices.filter((invoice) =>
    invoice?.categorie?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle back arrow click
  const handleBackClick = () => {
    navigate(`/Dashboard/`);
  };

  return (
    <div className="factures-container" style={{  marginTop:"70px"}}>
      <div className="header1">
        {/* Navigation arrow styled at the top left */}
        <div 
        className="back-arrow" 
        onClick={handleBackClick} 
        style={{
          position: 'absolute',
          left: '10px',
          top: '10px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          marginBottom: '20px',
          marginTop:'20px',
          color: '#435483',
        }}
      >
        <ArrowBackIcon style={{ marginRight: '5px' }} />
       
      </div>
        <h1>Gestion des Factures</h1>
        <div className="header-details"   >
          <Link className="btn-pay" to="/AddFacture">
            Ajouter facture
          </Link>
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher par catégorie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Display error message if there is an error */}
      {error && <div className="error-message">{error}</div>}

      {/* Tableau des factures */}
      <table className="facture-table">
        <thead>
          <tr>
            <th>ID</th> {/* Display generated ID */}
            <th>Catégorie</th>
            <th>Date</th>
            <th>Montant (€)</th>
            <th>Montant restant (€)</th>
            <th>Etat</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice, index) => (
            <tr key={invoice.id}>
              <td>{index + 1}</td> {/* Display generated ID */}
              <td>{invoice?.categorie || "-"}</td>
              <td>{invoice?.date || "-"}</td>
              <td>{invoice?.montant || 0}</td>
              <td>{invoice?.montantRestant || 0}</td>
              <td
                className={invoice?.etat === "Paid" ? "paid" : "unpaid"}
              >
                {invoice?.etat === "Paid" ? "Payée" : "Impayée"}
              </td>
              <td>
                <button
                  className="btn-update"
                  onClick={() => goUpdate(invoice.id)}
                >
                  Modifier
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteInvoice(invoice.id)} // Call handleDeleteInvoice
                >
              Supprimer
                </button>
                <button
                  className={`btn-pay ${invoice?.etat === "Paid" ? "btn-disabled" : ""}`}
                  onClick={() => invoice?.etat !== "Paid" && addPayment(invoice.id)}
                  disabled={invoice?.etat === "Paid"} // Disable if Paid
                >
                  Ajouter Paiement
                </button>
                <button
                  className="btn-bootstrap"
                  onClick={() => goToDetails(invoice.id)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacturesTable;
