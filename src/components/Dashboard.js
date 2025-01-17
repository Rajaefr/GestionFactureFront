import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

import { fetchPaiementsByCategory } from "../services/paiementService";
import { getFacturesEcheanceProche } from "../services/factureService";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FaHome, FaCar, FaHeart, FaBook } from "react-icons/fa"; // Import category icons

// Register required Chart.js components and the plugin
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, ChartDataLabels);

function Dashboard() {
  const [factures, setFactures] = useState([]);
  const [paiements, setPaiements] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Define icons for each category
  const categoryIcons = {
    Transportation: <FaCar style={{ color: "#0088FE", fontSize: "2rem" }} />,
    Housing: <FaHome style={{ color: "#00C49F", fontSize: "2rem" }} />,
    Healthcare: <FaHeart style={{ color: "#FFBB28", fontSize: "2rem" }} />,
    Obligation: <FaBook style={{ color: "#FF8042", fontSize: "2rem" }} />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch factures
        const facturesData = await getFacturesEcheanceProche();
        console.log("Fetched factures data:", facturesData); // Added log
        if (Array.isArray(facturesData)) {
          const formattedFactures = facturesData.map((facture) => ({
            id: facture.id,
            category: facture.categorie,
            montant: facture.montant,
            remainingAmount: facture.montantRestant,
            status: facture.etat,
          }));
          setFactures(formattedFactures);
        }

        // Fetch paiements and calculate category percentages
        const paiementsData = await fetchPaiementsByCategory();
        console.log("Fetched paiements data:", paiementsData); // Added log
        if (Array.isArray(paiementsData)) {
          const formattedChartData = paiementsData.map((item) => ({
            name: item.category,
            value: ((item.paidAmount / item.totalAmount) * 100).toFixed(2),
          }));

          setPaiements(paiementsData);
          setChartData(formattedChartData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Rendering the cards with icons
  const renderCards = () => (
    <div className="main-cards">
      {paiements.slice(0, 4).map((item, index) => (
        <div className="card" key={index} style={{padding:"0px" ,width:"400px"}}      >
          <div className="card-inner" >
            <div className="card-category"  >
              {categoryIcons[item.category]}
              <span style={{ fontSize: "1rem" }}>{item.category}</span>
            </div>
            <h2 style={{ fontSize: "1.5rem" }}>{item.totalAmount}€</h2>
            
          </div>
          <p style={{ color: "red", fontWeight: "bold" , marginTop:"20px"}}>
             Reste :{item.remainingAmount}€
            </p>
        </div>
      ))}
    </div>
  );

  // Rendering the table of invoices
  const renderTable = () => (
    <div className="invoice-table">
      <div className="header-details">
        <h3>Invoice Details</h3>
        <Link className="btn btn-outline-primary" to="/FacturesTable">
          View all
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Remaining Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {factures.length > 0 ? (
            factures.map((facture, index) => (
              <tr key={facture.id}>
                <td>{index + 1}</td>
                <td>{facture.category}</td>
                <td>{facture.montant}€</td>
                <td>{facture.remainingAmount}€</td>
                <td>{facture.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No invoices available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  // Rendering the Pie/Donut chart
  const renderChart = () => {
    const chartValues = chartData.map((data) => parseFloat(data.value));
    const chartLabels = chartData.map((data) => data.name);

    const data = {
      labels: chartLabels,
      datasets: [
        {
          label: "Paid Percentage",
          data: chartValues,
          backgroundColor: COLORS.slice(0, chartValues.length),
        },
      ],
    };

    const options = {
      plugins: {
        datalabels: {
          color: "#fff",
          formatter: (value) => `${value}%`,
          font: {
            weight: "bold",
          },
          anchor: "end",
          align: "start",
        },
      },
    };

    return (
      <div className="charts">
        {chartData.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <div>No data available for the chart.</div>
        )}
      </div>
    );
  };

  return (
    <main className="main-container">
      <div className="main-title" >
        <h2>Listes des catégorie</h2>
      </div>

      {renderCards()}

      <div className="chart-table-container">
        {loading ? (
          <div>Loading data...</div>
        ) : (
          <>
            {renderTable()}
            {renderChart()}
          </>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
