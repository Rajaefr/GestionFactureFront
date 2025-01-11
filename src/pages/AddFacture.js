import React, { useState } from 'react';

const AddFacture = () => {
  // State to store form data
  const [facture, setFacture] = useState({
    categorie: '',
    date: '', // Backend expects 'date', not 'dateEcheance'
    montant: '',
    montantRestant: '',
    etat: '' // Optional, backend can calculate this
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacture({
      ...facture,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/addfacture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facture),
      });

      if (response.ok) {
        console.log('Facture added successfully');
        // Optionally reset the form or redirect
        setFacture({
          categorie: '',
          date: '',
          montant: '',
          montantRestant: '',
          etat: '',
        });
      } else {
        console.error('Error adding facture');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-white">Ajouter une Facture</h2>

      <form onSubmit={handleSubmit} className="border p-4 rounded">
        {/* Categorie */}
        <div className="mb-3">
          <label htmlFor="categorie" className="form-label text-white">Catégorie</label>
          <input
            type="text"
            id="categorie"
            name="categorie"
            value={facture.categorie}
            onChange={handleChange}
            placeholder="Catégorie"
            className="form-control"
          />
        </div>

        {/* Date */}
        <div className="mb-3">
          <label htmlFor="date" className="form-label text-white">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={facture.date}
            onChange={handleChange}
              placeholder="Date d'échéance"
            className="form-control"
          />
        </div>

        {/* Montant */}
        <div className="mb-3">
          <label htmlFor="montant" className="form-label text-white">Montant</label>
          <input
            type="number"
            id="montant"
            name="montant"
            value={facture.montant}
            onChange={handleChange}
            placeholder="Montant"
            className="form-control"
          />
        </div>

        {/* Montant Restant */}
        <div className="mb-3">
          <label htmlFor="montantRestant" className="form-label text-white">Montant Restant</label>
          <input
            type="number"
            id="montantRestant"
            name="montantRestant"
            value={facture.montantRestant}
            onChange={handleChange}
            placeholder="Montant Restant"
            className="form-control"
          />
        </div>

        {/* Etat */}
        <div className="mb-3">
          <label htmlFor="etat" className="form-label text-white">État</label>
          <input
            type="text"
            id="etat"
            name="etat"
            value={facture.etat}
            onChange={handleChange}
            placeholder="État"
            className="form-control"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Ajouter Facture</button>
      </form>
    </div>
  );
};

export default AddFacture;
