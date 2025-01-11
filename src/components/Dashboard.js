import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import { fetchPaiementsByCategory} from "../services/paiementService";
import { getFacturesEcheanceProche } from "../services/factureService";

function Dashboard() {
  const [factures, setFactures] = useState([]);
  const [paiements, setPaiements] = useState([]);
  const [chartData, setChartData] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;

  useEffect(() => {
    // Fetch data for factures and paiements
    const fetchData = async () => {
      try {
        const facturesData = await getFacturesEcheanceProche();
        setFactures(facturesData);

        const paiementsData = await fetchPaiementsByCategory();
        setPaiements(paiementsData);

        // Transform paiements data into chart data
        const chartFormattedData = paiementsData.map((item) => ({
          name: item.category,
          value: item.total,
        }));
        setChartData(chartFormattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
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
              {index === 0 && <BsFillArchiveFill className="card-icon" />}
              {index === 1 && <BsFillGrid3X3GapFill className="card-icon" />}
              {index === 2 && <BsPeopleFill className="card-icon" />}
              {index === 3 && <BsFillBellFill className="card-icon" />}
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
                <th>Description</th>
                <th>Montant</th>
                <th>Montant restant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {factures.map((facture) => (
                <tr key={facture.id}>
                  <td>{facture.id}</td>
                  <td>{facture.description}</td>
                  <td>{facture.amount}€</td>
                  <td>{facture.remainingAmount}€</td>
                  <td>{facture.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
