import API from "./api";
import axios from "axios";
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





// Fetch a specific facture's details
export const getFactureDetails = async (factureId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error("No access token found. Please log in again.");
    }

    const response = await axios.get(`http://localhost:8080/api/factures`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Find the specific facture by ID
    const facture = response.data.find(facture => facture.id === parseInt(factureId));
    if (!facture) {
      throw new Error(`Facture with ID ${factureId} not found.`);
    }

    return facture;
  } catch (error) {
    console.error('Error fetching facture details:', error);
    throw error;
  }
};

// Fetch payments for a specific facture
export const getFacturePayments = async (factureId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error("No access token found. Please log in again.");
    }

    const response = await axios.get(`http://localhost:8080/list-paiements/${factureId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data; // List of PaiementDto
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};



// Other API functions for update and delete...





export const addFacture = async (invoice) => {
  try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
          throw new Error("No access token found. Please log in again.");
      }

      // Ensure the invoice is a valid object and convert it to JSON
      if (!invoice || typeof invoice !== "object") {
          throw new Error("Invalid invoice data. Expected a valid object.");
      }

     /* const jsonString = JSON.stringify(invoice);*/

      console.log("AuthToken:", token);
      console.log("Invoice Data (JSON):", invoice);

      const response = await axios.post(
          `http://localhost:8080/api/add-facture`,
          invoice, // Send the JSON string as the body
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
          }
      );

      return response.data;
  } catch (error) {
      console.error("Error in addFacture:", error.message);

      if (error.response) {
          // Log detailed server response error
          console.error("Response Status:", error.response.status);
          console.error("Response Data:", error.response.data);
      } else {
          console.error("Error details:", error);
      }

      throw error; // Re-throw the error to handle it upstream
  }
};




export const updateFacture = async (id, facture) => {

    const fact={
      "description":"food"
    }
  
  try {
    const token = localStorage.getItem('accessToken');
    console.log("test");
    if (!token) {
      throw new Error("No access token found. Please log in again.");
    }

    // Make the PUT request with the authorization token
    const response = await API.put(`http://localhost:8080/update/${id}`, fact, {
      headers: {
        Authorization: `Bearer ${token}`,
        method: 'PUT',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating facture:", error);
    throw error;
  }
};



// Delete a facture
export const deleteFacture = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error("No access token found. Please log in again.");
    }
console.log("delete acture");
const response = await axios.delete(`http://localhost:8080/delete/${id}`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting facture:", error);
    throw error;
  }
};



// Delete a specific payment
export const deletePaiement = async (paiementId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error("No access token found. Please log in again.");
    }

    const response = await axios.delete(`http://localhost:8080/delete-paiement/${paiementId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data; // Success message or status
  } catch (error) {
    console.error('Error deleting payment:', error);
    throw error;
  }
};
