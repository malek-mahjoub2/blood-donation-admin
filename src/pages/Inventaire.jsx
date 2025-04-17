import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Inventaire.css';

const Inventaire = () => {
  // Blood stock data for Tunisian hospitals
  const [inventory, setInventory] = useState([
    { 
      bloodType: 'O+', 
      quantity: 145, 
      threshold: 50,
      status: 'safe',
      location: 'Centre National, Tunis',
      lastUpdate: '2023-12-15T09:30:00'
    },
    { 
      bloodType: 'O-', 
      quantity: 28, 
      threshold: 30,
      status: 'warning',
      location: 'CHU Sahloul, Sousse',
      lastUpdate: '2023-12-15T10:15:00'
    },
    { 
      bloodType: 'A+', 
      quantity: 92, 
      threshold: 40,
      status: 'safe',
      location: 'Hôpital Régional, Sfax',
      lastUpdate: '2023-12-14T16:45:00'
    },
    { 
      bloodType: 'B+', 
      quantity: 37, 
      threshold: 35,
      status: 'warning',
      location: 'Hôpital Tahar Sfar, Mahdia',
      lastUpdate: '2023-12-15T11:20:00'
    },
    { 
      bloodType: 'AB+', 
      quantity: 15, 
      threshold: 20,
      status: 'critical',
      location: 'Hôpital Habib Bourguiba, Sfax',
      lastUpdate: '2023-12-15T08:10:00'
    }
  ]);

  const [selectedLocation, setSelectedLocation] = useState('Tous');
  const locations = ['Tous', 'Tunis', 'Sousse', 'Sfax', 'Mahdia'];

  const filteredInventory = selectedLocation === 'Tous' 
    ? inventory 
    : inventory.filter(item => item.location.includes(selectedLocation));

  const handleStockUpdate = (bloodType, newQuantity) => {
    setInventory(inventory.map(item => 
      item.bloodType === bloodType 
        ? { ...item, quantity: Math.max(0, newQuantity) } 
        : item
    ));
  };

  return (
    <div className="inventaire-container">
      <header className="inventaire-header">
        <h1>
          <span className="pulse-icon">🩸</span>
          Inventaire National du Sang
        </h1>
        <div className="last-update">
          Dernière mise à jour: {new Date().toLocaleDateString('fr-TN')}
        </div>
      </header>

      <div className="inventory-controls">
        <div className="location-filter">
          <label>Filtrer par région:</label>
          <select 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="blood-stock-grid">
        {filteredInventory.map((item) => (
          <motion.div 
            key={item.bloodType}
            className={`stock-card ${item.status}`}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="blood-type-header">
              <h3>{item.bloodType}</h3>
              <div className={`status-indicator ${item.status}`}>
                {item.status === 'critical' ? 'CRITIQUE' : 
                 item.status === 'warning' ? 'ALERTE' : 'STABLE'}
              </div>
            </div>

            <div className="stock-details">
              <div className="stock-meter">
                <div 
                  className="meter-fill"
                  style={{ 
                    width: `${Math.min(100, (item.quantity / item.threshold) * 100)}%`,
                    backgroundColor: getStatusColor(item.status)
                  }}
                ></div>
              </div>
              <div className="stock-numbers">
                <span className="current-stock">{item.quantity} unités</span>
                <span className="threshold">/ {item.threshold} min</span>
              </div>
            </div>

            <div className="location-info">
              <span className="location-icon">🏥</span>
              {item.location.split(',')[0]}
            </div>

            <div className="stock-actions">
              <div className="stock-adjustment">
                <button 
                  onClick={() => handleStockUpdate(item.bloodType, item.quantity - 1)}
                  disabled={item.quantity <= 0}
                >
                  -
                </button>
                <button 
                  onClick={() => handleStockUpdate(item.bloodType, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button className="transfer-btn">
                Transfert
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="inventory-summary">
        <div className="summary-card critical">
          <h4>Stock Critique</h4>
          <p>{inventory.filter(i => i.status === 'critical').length} groupes</p>
        </div>
        <div className="summary-card warning">
          <h4>Niveaux d'Alerte</h4>
          <p>{inventory.filter(i => i.status === 'warning').length} groupes</p>
        </div>
        <div className="summary-card total">
          <h4>Stock Total</h4>
          <p>{inventory.reduce((sum, i) => sum + i.quantity, 0)} unités</p>
        </div>
      </div>
    </div>
  );
};

// Helper function
const getStatusColor = (status) => {
  const colors = {
    critical: '#ff4757',
    warning: '#ffa502',
    safe: '#2ed573'
  };
  return colors[status] || '#3498db';
};

export default Inventaire;