import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import { fetchPaiementsByCategory } from "../services/paiementService";
import { getFacturesEcheanceProche } from "../services/factureService";

function Dashboard() {
  const [factures, setFactures] = useState([]);
  const [paiements, setPaiements] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
   const fetchData = async () => {
  try {
    setLoading(true); // Set loading to true before fetching
    const facturesData = await getFacturesEcheanceProche();
    
    console.log("Fetched Factures Data:", facturesData); // Log the fetched data to inspect it

    if (Array.isArray(facturesData) && facturesData.length > 0) {
      setFactures(facturesData); // Set the factures data if valid
    } else {
      console.error("No valid factures available or data format is incorrect.");
      setFactures([]); // Set it to an empty array if no valid data
    }

    const paiementsData = await fetchPaiementsByCategory();
    setPaiements(paiementsData);

    // Format chart data if paiementsData is valid
    if (Array.isArray(paiementsData)) {
      const chartFormattedData = paiementsData.map((item) => ({
        name: item.category,
        value: item.total,
      }));
      setChartData(chartFormattedData);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false); // Set loading to false after fetching
  }
};


    fetchData();
  }, []);

  const renderChart = () => {
    if (chartData.length === 0) {
      return <div>No data available for the chart.</div>;
    }

    return (
      <div className="dummy-chart">
        {chartData.map((data, index) => (
          <div
            key={index}
            style={{
              width: `${data.value}%`,
              backgroundColor: COLORS[index % COLORS.length],
              color: "white",
              padding: "10px",
              margin: "5px 0",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            {data.name}: {data.value}%
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="main-container">
      <div className="main-title"></div>
      <div className="main-cards">
        {paiements.slice(0, 4).map((item, index) => (
          <div className="card" key={index}>
            <div className="card-inner">
              <h3>{item.category}</h3>
              <span className={`card-icon icon-${index}`}></span>
            </div>
            <h1>{item.total}</h1>
          </div>
        ))}
      </div>

      <div className="chart-table-container">
        <div className="invoice-table">
          <div className="header-details">
            <h3>Détails des factures</h3>
            <Link className="btn btn-outline-primary" to="/factures">
              View all
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Catégorie</th>
                <th>Montant</th>
                <th>Montant restant</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(factures) && factures.length > 0 ? (
                factures.map((facture) => (
                  <tr key={facture.id}>
                    <td>{facture.id}</td>
                    <td>{facture.category}</td>
                    <td>{facture.montant}€</td>
                    <td>{facture.remainingAmount}€</td>
                    <td>{facture.status}</td>
                    <td>
                      <Link to={`/paiements/${facture.id}`} className="btn btn-primary">
                        Voir les paiements
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No factures available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {loading ? (
          <div>Loading chart data...</div>
        ) : (
          <div className="charts">{renderChart()}</div>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
