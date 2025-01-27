// src/pages/HomePage.js
import React from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="accueil-container">
      <div className="image-container">
        <img
          src="https://th.bing.com/th/id/OIP.AcxP7SUCPer1nNjZmRJ5VgHaE8?w=329&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"
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

        <Link
  className="btn btn-outline-secondary"
  to="/login"
  style={{ backgroundColor: '#05447c', color: 'white' }}
>
  get started
</Link>

      </div>
    </div>
  );
}

export default Home;
