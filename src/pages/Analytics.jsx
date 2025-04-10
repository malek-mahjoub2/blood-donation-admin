import React from 'react';
import { LineChart, BarChart, PieChart } from '../components/Charts';
import './Analytics.css';

const Analytics = () => {
  // Sample data
  const donationTrends = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Dons par mois',
        data: [120, 190, 150, 210, 180, 240],
        borderColor: '#c0392b',
        backgroundColor: 'rgba(192, 57, 43, 0.1)',
      }
    ]
  };

  const bloodTypeDistribution = {
    labels: ['O+', 'O-', 'A+', 'B+', 'AB+'],
    datasets: [
      {
        label: 'Répartition des groupes',
        data: [35, 10, 25, 15, 5],
        backgroundColor: [
          '#FF6B6B',
          '#FF2D2D',
          '#FF8E8E',
          '#FF5252',
          '#FF7A7A'
        ],
      }
    ]
  };

  return (
    <div className="analytics-container">
      <h1 className="page-title">📈 Analytiques des Dons Sanguins</h1>
      
      <div className="chart-grid">
        <div className="chart-card">
          <h2>Tendance Mensuelle des Dons</h2>
          <LineChart data={donationTrends} />
        </div>

        <div className="chart-card">
          <h2>Répartition par Groupe Sanguin</h2>
          <PieChart data={bloodTypeDistribution} />
        </div>

        <div className="chart-card full-width">
          <h2>Collectes par Centre</h2>
          <BarChart 
            data={{
              labels: ['Tunis', 'Soussa', 'Nabel', 'Binzarte'],
              datasets: [{
                label: 'Nombre de dons',
                data: [320, 210, 180, 150],
                backgroundColor: '#c0392b'
              }]
            }}
          />
        </div>
      </div>

      <div className="kpi-cards">
        <div className="kpi-card">
          <span className="kpi-value">1,245</span>
          <span className="kpi-label">Dons ce mois</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-value">78%</span>
          <span className="kpi-label">Taux de remplissage</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-value">32</span>
          <span className="kpi-label">Nouveaux donneurs</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;