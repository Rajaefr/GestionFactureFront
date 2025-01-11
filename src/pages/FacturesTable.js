import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FacturesTable.css";

const AddFacture = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      type: "Électricité",
      date: "2025-01-05",
      montant: 120,
      statut: "Impayée",
    },
    {
      id: 2,
      type: "Internet",
      date: "2025-01-03",
      montant: 60,
      statut: "Payée",
    },
    { id: 3, type: "Eau", date: "2024-12-29", montant: 80, statut: "Impayée" },
    {
      id: 4,
      type: "Maintenance",
      date: "2024-12-25",
      montant: 300,
      statut: "Payée",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const deleteInvoice = (id) => {
    const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updatedInvoices);
  };

  const updateInvoice = (id) => {
    alert(`Mise à jour de la facture ID: ${id}`);
  };

  const addPayment = (id) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === id ? { ...invoice, statut: "Payée" } : invoice
    );
    setInvoices(updatedInvoices);
  };

  // Filtrer les factures par catégorie
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="addfacture-container">
      <div className="header">
        <h1>Gestion des Factures</h1>
        <Link className="btn btn-outline-primary" to="/AddFacture">
          {" "}
          Ajouter facture{" "}
        </Link>

        <input
          type="text"
          className="search-input"
          placeholder="Rechercher par catégorie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tableau des factures */}
      <table className="facture-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Date</th>
            <th>Montant (€)</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.type}</td>
              <td>{invoice.date}</td>
              <td>{invoice.montant}</td>
              <td className={invoice.statut === "Payée" ? "paid" : "unpaid"}>
                {invoice.statut}
              </td>
              <td>
                <button
                  className="btn-update"
                  onClick={() => updateInvoice(invoice.id)}
                >
                  Update
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteInvoice(invoice.id)}
                >
                  Delete
                </button>
                {invoice.statut === "Impayée" && (
                  <button
                    className="btn-pay"
                    onClick={() => addPayment(invoice.id)}
                  >
                    Ajouter Paiement
                  </button>
                )}
                {invoice.statut === "Payée" && (
                  <button className="btn-pay-disabled" disabled>
                    Paiement effectué
                  </button>
                )}
                <button
                  className="btn-bootstrap"
                  onClick={() => deleteInvoice(invoice.id)}
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

export default AddFacture;
