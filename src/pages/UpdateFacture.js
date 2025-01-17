import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateFacture } from "../services/factureService"; // Import your updateFacture function
import "../styles/UpdateFacture.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the arrow icon

const UpdateFactureComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initialize formData state
  const [formData, setFormData] = useState({
    categorie: "",
    date: "",
    montant: "",
    etat: "",
  });

  const [error, setError] = useState(null); // Error state to handle errors
  const [loading, setLoading] = useState(true); // Loading state for fetching

  // Fetch facture data from the backend when component mounts
  useEffect(() => {
    const fetchFacture = async () => {
      try {
        const response = await fetch(`http://localhost:8080/factures/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Ensure this token is valid
          },
        });

        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          throw new Error("Facture not found");
        }

        const facture = await response.json();
        setFormData({
          categorie: facture.categorie,
          date: facture.date,
          montant: facture.montant,
          etat: facture.etat
        });
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacture();
  }, [id]);

  // Handle input changes in the form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (sending data to the backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: check if all fields are filled
    if (!formData.categorie || !formData.date || !formData.montant || !formData.etat) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      setError(null); // Clear previous errors

      // Call the service to update the facture using the imported updateFacture function
      await updateFacture(id, formData);

      alert("Facture mise à jour !");
      navigate("/factures"); // Navigate back to the list of invoices
    } catch (err) {
      setError(err.message);
    }
  };

  // Render loading state or error message if there's an error
  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  // Function to handle back arrow click
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="updatefacture-container">
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
          color: '#435483',
          marginBottom: '20px',
          marginTop:'20px',
        }}
      >
        <ArrowBackIcon style={{ marginRight: '5px' }} />
       
      </div>
      <h2>Mettre à jour la Facture </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            placeholder="categorie"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="montant">Montant (€)</label>
          <input
            type="number"
            name="montant"
            value={formData.montant}
            onChange={handleChange}
            placeholder="Montant (€)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="statut">Statut</label>
          <select name="statut" value={formData.etat} onChange={handleChange} required>
            <option value="Impayée">Impayée</option>
            <option value="Payée">Payée</option>
          </select>
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
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateFactureComponent;
