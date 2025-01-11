import API from "./api";

export const getFacturesEcheanceProche = async (page = 0, size = 10) => {
  try {
    const response = await API.get(`/factures-echeance-proche?page=${page}&size=${size}`);
    console.log("API Response:", response); // Log the entire response
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching factures:", error);
    return [];
  }
};


// Add a new facture
export const addFacture = async (facture) => {
  try {
    const response = await API.post("/add-facture", facture);
    return response.data;
  } catch (error) {
    console.error("Error adding facture:", error);
    throw error;
  }
};

// Update an existing facture
export const updateFacture = async (id, facture) => {
  try {
    const response = await API.patch(`/update-facture/${id}`, facture);
    return response.data;
  } catch (error) {
    console.error("Error updating facture:", error);
    throw error;
  }
};

// Delete a facture
export const deleteFacture = async (id) => {
  try {
    const response = await API.delete(`/delete-facture/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting facture:", error);
    throw error;
  }
};
