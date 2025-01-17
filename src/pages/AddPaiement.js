import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPaiement } from "../services/paiementService"; // Assurez-vous que la fonction addPaiement est correctement importée
import "../styles/AddPaiement.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the arrow icon

const AddPaiement = () => {
  const [paymentDate, setPaymentDate] = useState(""); // Date du paiement
  const [paymentAmount, setPaymentAmount] = useState(""); // Montant du paiement
  const { id } = useParams(); // Récupérer l'ID de la facture depuis l'URL
  const navigate = useNavigate(); // Utilisé pour la redirection après l'ajout du paiement

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la validité du montant du paiement
    if (parseFloat(paymentAmount) <= 0) {
      alert("Le montant du paiement doit être un nombre positif.");
      return;
    }

    // Structure du paiement avec les bonnes données
    const paiement = {
      date: paymentDate, // Utiliser "date" comme clé
      montant: parseFloat(paymentAmount), // Assurez-vous que le montant est un nombre
    };

    try {
      // Appel de la fonction pour ajouter un paiement avec l'ID de la facture et les données du paiement
      await addPaiement(id, paiement);
      
      alert(`Paiement ajouté avec succès pour la facture `);
      navigate("/FacturesTable"); // Redirection vers la liste des factures après l'ajout du paiement
    } catch (error) {
      console.error("Erreur lors de l'ajout du paiement:", error.response?.data || error.message);
      alert(error.response?.data || "Une erreur est survenue lors de l'ajout du paiement.");
    }
  };

  // Function to handle back arrow click
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="add-paiement-container">
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
      <h2>Ajouter un paiement pour la facture </h2>
      <form onSubmit={handlePaymentSubmit}>
        <div className="form-group">
          <label htmlFor="paymentDate">Date du paiement</label>
          <input
            type="date"
            id="paymentDate"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)} // Mise à jour de la date
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="paymentAmount">Montant</label>
          <input
            type="number"
            id="paymentAmount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)} // Mise à jour du montant
            required
            min="0"
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#435483",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Ajouter le paiement
        </button>
      </form>
    </div>
  );
};

export default AddPaiement;
