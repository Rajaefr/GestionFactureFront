import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Ajout de useNavigate
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import de l'icône
import { getFactureDetails, getFacturePayments, deletePaiement } from '../services/factureService';
import '../styles/DetailsFacture.css';

const DetailsFacture = () => {
  const { id } = useParams(); // Facture ID from URL params
  const navigate = useNavigate(); // Navigation
  const [facture, setFacture] = useState(null);
  const [paiements, setPaiements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 2; // Display 2 payments per page

  useEffect(() => {
    if (!id) {
      console.error('Facture ID is missing from the URL!');
      return;
    }

    const fetchFactureData = async () => {
      try {
        // Fetch facture details
        const fetchedFacture = await getFactureDetails(id);
        setFacture(fetchedFacture);

        // Fetch associated payments
        const fetchedPaiements = await getFacturePayments(id);
        setPaiements(fetchedPaiements);
      } catch (error) {
        console.error('Error fetching facture or payments:', error);
      }
    };

    fetchFactureData();
  }, [id]);

  const handleDelete = async (paiementId) => {
    try {
      await deletePaiement(paiementId);
      setPaiements((prev) => prev.filter((paiement) => paiement.id !== paiementId));
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleBackClick = () => {
    navigate('/facturesTable'); // Navigate back to FacturesTable
  };

  if (!facture) {
    return <p>Chargement des données...</p>; // Loading state
  }

  // Paginate payments
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPaiements = paiements.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(paiements.length / itemsPerPage);

  return (
    <div className="container">
      {/* Flèche retour dans le coin supérieur gauche */}
      <div 
        className="back-arrow" 
        onClick={handleBackClick} 
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          marginBottom: '20px',
          color: '#435483',
        }}
      >
        <ArrowBackIcon style={{ marginRight: '5px' }} />
        <span>Retour</span>
      </div>

      <div className="tables-container">
        <div className="invoice-details">
          <h2>Détails de la Facture</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>Catégorie :</strong></td>
                <td>{facture.categorie}</td>
              </tr>
              <tr>
                <td><strong>Date :</strong></td>
                <td>{facture.date}</td>
              </tr>
              <tr>
                <td><strong>Montant total (€) :</strong></td>
                <td>{facture.montant} €</td>
              </tr>
              <tr>
                <td><strong>Montant restant (€) :</strong></td>
                <td>{facture.montantRestant} €</td>
              </tr>
              <tr>
                <td><strong>Statut :</strong></td>
                <td>{facture.etat}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="payment-details">
          <h2>Historique des Paiements</h2>
          <table>
            <thead>
              <tr>
                <th>Numéro de paiement</th>
                <th>Date de paiement</th>
                <th>Montant payé (€)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPaiements.length > 0 ? (
                paginatedPaiements.map((paiement, index) => (
                  <tr key={paiement.id}>
                    <td>Paiement </td>
                    <td>{paiement.date}</td>
                    <td>{paiement.montant} €</td>
                    <td>
                      <button onClick={() => handleDelete(paiement.id)}>Supprimer</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Aucun paiement enregistré.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Précédent
              </button>
              <span>
                Page {currentPage} sur {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsFacture;
