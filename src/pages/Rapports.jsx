import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Rapports.css';

const Rapports = () => {
  // Sample data for reports
  const [timeRange, setTimeRange] = useState('month');
  
  const monthlyData = [
    { name: 'Jan', donations: 320, donors: 280, collected: 280 },
    { name: 'Fév', donations: 300, donors: 250, collected: 250 },
    { name: 'Mar', donations: 450, donors: 400, collected: 400 },
    { name: 'Avr', donations: 380, donors: 350, collected: 350 },
    { name: 'Mai', donations: 420, donors: 380, collected: 380 },
    { name: 'Jun', donations: 500, donors: 450, collected: 450 },
    { name: 'Jul', donations: 480, donors: 430, collected: 430 },
    { name: 'Aoû', donations: 390, donors: 350, collected: 350 },
    { name: 'Sep', donations: 410, donors: 370, collected: 370 },
    { name: 'Oct', donations: 520, donors: 480, collected: 480 },
    { name: 'Nov', donations: 550, donors: 500, collected: 500 },
    { name: 'Déc', donations: 600, donors: 550, collected: 550 },
  ];

  const weeklyData = [
    { name: 'Sem 1', donations: 80, donors: 70, collected: 70 },
    { name: 'Sem 2', donations: 75, donors: 65, collected: 65 },
    { name: 'Sem 3', donations: 90, donors: 80, collected: 80 },
    { name: 'Sem 4', donations: 85, donors: 75, collected: 75 },
  ];

  const yearlyData = [
    { name: '2020', donations: 3200, donors: 2800, collected: 2800 },
    { name: '2021', donations: 3800, donors: 3400, collected: 3400 },
    { name: '2022', donations: 4500, donors: 4000, collected: 4000 },
    { name: '2023', donations: 5200, donors: 4800, collected: 4800 },
  ];

  const currentData = timeRange === 'week' ? weeklyData : 
                      timeRange === 'month' ? monthlyData : yearlyData;

  // Top locations data
  const topLocations = [
    { name: 'Centre National, Tunis', donations: 1250 },
    { name: 'CHU Sahloul, Sousse', donations: 980 },
    { name: 'Hôpital Régional, Sfax', donations: 870 },
    { name: 'Hôpital Farhat Hached, Sousse', donations: 750 },
    { name: 'Hôpital Habib Bourguiba, Sfax', donations: 680 },
  ];

  // Blood type distribution
  const bloodTypeData = [
    { name: 'O+', value: 38 },
    { name: 'A+', value: 28 },
    { name: 'B+', value: 20 },
    { name: 'O-', value: 5 },
    { name: 'A-', value: 4 },
    { name: 'AB+', value: 3 },
    { name: 'B-', value: 1 },
    { name: 'AB-', value: 1 },
  ];

  return (
    <div className="rapports-container">
      <h1 className="page-title">📊 Rapports de Don</h1>
      
      {/* Time Range Selector */}
      <div className="time-selector">
        <button 
          className={timeRange === 'week' ? 'active' : ''}
          onClick={() => setTimeRange('week')}
        >
          Hebdomadaire
        </button>
        <button 
          className={timeRange === 'month' ? 'active' : ''}
          onClick={() => setTimeRange('month')}
        >
          Mensuel
        </button>
        <button 
          className={timeRange === 'year' ? 'active' : ''}
          onClick={() => setTimeRange('year')}
        >
          Annuel
        </button>
      </div>
      
      {/* Main Chart */}
      <div className="chart-container">
        <h2>Statistiques des Dons {timeRange === 'week' ? 'Hebdomadaires' : timeRange === 'month' ? 'Mensuelles' : 'Annuelles'}</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="donations" fill="#8884d8" name="Dons programmés" />
            <Bar dataKey="collected" fill="#82ca9d" name="Dons collectés" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Dons ce mois</h3>
          <p className="number">520</p>
          <p className="change positive">↑ 12% vs mois dernier</p>
        </div>
        <div className="stat-card">
          <h3>Nouveaux donneurs</h3>
          <p className="number">48</p>
          <p className="change positive">↑ 8% vs mois dernier</p>
        </div>
        <div className="stat-card">
          <h3>Taux de collecte</h3>
          <p className="number">92%</p>
          <p className="change neutral">→ stable</p>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Top Locations */}
        <div className="top-locations">
          <h2>Top Centres de Collecte</h2>
          <div className="locations-list">
            {topLocations.map((location, index) => (
              <div key={index} className="location-item">
                <span className="rank">{index + 1}</span>
                <span className="name">{location.name}</span>
                <span className="donations">{location.donations} dons</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Blood Type Distribution */}
        <div className="blood-type-chart">
          <h2>Répartition par Groupe Sanguin</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bloodTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ff6b6b" name="Pourcentage" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Rapports;