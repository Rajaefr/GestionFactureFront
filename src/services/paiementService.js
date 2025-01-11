
// paiementService.js
import API from "./api";

// Get all payments for a specific invoice
export const getPaiements = async (factureId) => {
  try {
    const response = await API.get(`/list-paiement/${factureId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching paiements:", error);
    throw error;
  }
};

// Add a new payment to an invoice
export const addPaiement = async (factureId, paiement) => {
  try {
    const response = await API.post(`/add-paiement/${factureId}`, paiement);
    return response.data;
  } catch (error) {
    console.error("Error adding paiement:", error);
    throw error;
  }
};

// Update an existing payment
export const updatePaiement = async (id, paiement) => {
  try {
    const response = await API.patch(`/update-paiement/${id}`, paiement);
    return response.data;
  } catch (error) {
    console.error("Error updating paiement:", error);
    throw error;
  }
};

// Delete a payment
export const deletePaiement = async (id) => {
  try {
    const response = await API.delete(`/delete-paiement/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting paiement:", error);
    throw error;
  }
};

// Fetch payments by category for the current month
export const fetchPaiementsByCategory = async () => {
  try {
    const response = await API.get("/paiements-categories");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching paiements by category:", error);
    return [];
  }
};
