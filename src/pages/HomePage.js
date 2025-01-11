// src/pages/HomePage.js
import React from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="accueil-container">
      <div className="image-container">
        <img
          src="/images/fact.png"
          alt="Illustration du service de facturation"
        />
      </div>
      <div className="message-container">
        <h1>Bienvenue sur notre application de gestion de factures</h1>
        <p>
          Simplifiez la gestion de vos factures avec notre application
          intuitive. Suivez vos paiements, générez des rapports, et accédez à
          toutes vos données en temps réel.
        </p>

        <Link className="btn btn-outline-primary" to="/login">
          {" "}
          get started{" "}
        </Link>
      </div>
    </div>
  );
}

export default Home;
