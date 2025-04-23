import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Collectes.css';

const Collectes = () => {
  // Tunisian governorates
  const governorates = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", 
    "Nabeul", "Zaghouan", "Bizerte", "Béja",
    "Jendouba", "Le Kef", "Siliana", "Kairouan",
    "Kasserine", "Sidi Bouzid", "Sousse", "Monastir",
    "Mahdia", "Sfax", "Gabès", "Médenine",
    "Tataouine", "Gafsa", "Tozeur", "Kebili"
  ];

  // Sample blood drives in Tunisia
  const [bloodDrives, setBloodDrives] = useState([
    {
      id: 1,
      location: 'Centre National de Transfusion Sanguine, Tunis',
      governorate: 'Tunis',
      date: '2023-12-15',
      time: '08:00 - 16:00',
      donorsRegistered: 127,
      target: 200,
      status: 'planned'
    },
    {
      id: 2,
      location: 'Hôpital Universitaire Farhat Hached, Sousse',
      governorate: 'Sousse',
      date: '2023-12-18',
      time: '09:00 - 17:00',
      donorsRegistered: 89,
      target: 150,
      status: 'planned'
    },
    {
      id: 3,
      location: 'Complexe Hospitalier Universitaire, Sfax',
      governorate: 'Sfax',
      date: '2023-11-25',
      time: '07:30 - 15:30',
      donorsRegistered: 210,
      target: 180,
      status: 'completed'
    }
  ]);

  const [newDrive, setNewDrive] = useState({
    location: '',
    governorate: '',
    date: '',
    time: '08:00 - 16:00', // Default Tunisian working hours
    target: 100
  });

  const handleAddDrive = () => {
    setBloodDrives([...bloodDrives, {
      id: Math.max(...bloodDrives.map(d => d.id)) + 1,
      ...newDrive,
      donorsRegistered: 0,
      status: 'planned'
    }]);
    setNewDrive({ 
      location: '', 
      governorate: '', 
      date: '', 
      time: '08:00 - 16:00', 
      target: 100 
    });
  };

  return (
    <div className="collectes-container">
      <h1 className="page-title">💉 Collectes de Sang</h1>
      
      <div className="collectes-grid">
        {bloodDrives.map((drive) => (
          <motion.div 
            key={drive.id}
            className={`drive-card ${drive.status}`}
            whileHover={{ y: -5 }}
          >
            <div className="drive-header">
              <h3>{drive.location}</h3>
              <div className="drive-meta">
                <span className="governorate-badge">{drive.governorate}</span>
                <span className={`status-badge ${drive.status}`}>
                  {drive.status === 'completed' ? 'Terminée' : ' Planifiée'}
                </span>
              </div>
            </div>
            
            <div className="drive-details">
              <p><strong> Date:</strong> {new Date(drive.date).toLocaleDateString('fr-TN')}</p>
              <p><strong>Heure:</strong> {drive.time}</p>
              
              <div className="progress-container">
                <div className="progress-label">
                  <span>Inscrits: {drive.donorsRegistered}/{drive.target}</span>
                  <span>{Math.round((drive.donorsRegistered/drive.target)*100)}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${Math.min(100, (drive.donorsRegistered/drive.target)*100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="drive-actions">
              <button className="action-btn view-btn"> Détails</button>
              {drive.status === 'planned' && (
                <button className="action-btn edit-btn">Modifier</button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add New Blood Drive Form */}
      <motion.div 
        className="new-drive-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3>Nouvelle Collecte</h3>
        
        <div className="form-group">
          <label>Lieu:</label>
          <input 
            type="text" 
            value={newDrive.location}
            onChange={(e) => setNewDrive({...newDrive, location: e.target.value})}
            placeholder="Hôpital ou centre"
            dir="auto"
          />
        </div>
        
        <div className="form-group">
          <label>Gouvernorat:</label>
          <select
            value={newDrive.governorate}
            onChange={(e) => setNewDrive({...newDrive, governorate: e.target.value})}
          >
            <option value=""> Choisir gouvernorat</option>
            {governorates.map(gov => (
              <option key={gov} value={gov}>{gov}</option>
            ))}
          </select>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Date:</label>
            <input 
              type="date" 
              value={newDrive.date}
              onChange={(e) => setNewDrive({...newDrive, date: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="form-group">
            <label> Heure:</label>
            <input 
              type="text" 
              value={newDrive.time}
              onChange={(e) => setNewDrive({...newDrive, time: e.target.value})}
              placeholder="08:00 - 16:00"
            />
          </div>
          
          <div className="form-group">
            <label>objectif:</label>
            <input 
              type="number" 
              value={newDrive.target}
              onChange={(e) => setNewDrive({...newDrive, target: e.target.value})}
              min="50"
            />
          </div>
        </div>
        
        <button 
          className="add-drive-btn"
          onClick={handleAddDrive}
          disabled={!newDrive.location || !newDrive.governorate || !newDrive.date}
        >
           Ajouter
        </button>
      </motion.div>
    </div>
  );
};

export default Collectes;