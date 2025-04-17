import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Donneurs.css';

const Donneurs = () => {
  // Tunisian governorates
  const governorates = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", 
    "Nabeul", "Zaghouan", "Bizerte", "Béja",
    "Jendouba", "Le Kef", "Siliana", "Kairouan",
    "Kasserine", "Sidi Bouzid", "Sousse", "Monastir",
    "Mahdia", "Sfax", "Gabès", "Médenine",
    "Tataouine", "Gafsa", "Tozeur", "Kebili"
  ];

  // Blood types
  const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  // Sample donors data
  const [donors, setDonors] = useState([
    {
      id: 1,
      name: 'Mohamed Ben Ali',
      cin: '12345678',
      bloodType: 'O+',
      governorate: 'Tunis',
      lastDonation: '2023-11-15',
      donationsCount: 5,
      phone: '12345678',
      email: 'mohamed.benali@example.com',
      status: 'active'
    },
    {
      id: 2,
      name: 'Amira Trabelsi',
      cin: '87654321',
      bloodType: 'A-',
      governorate: 'Sousse',
      lastDonation: '2023-10-20',
      donationsCount: 3,
      phone: '98765432',
      email: 'amira.trabelsi@example.com',
      status: 'active'
    },
    {
      id: 3,
      name: 'Samir Boukadida',
      cin: '45678912',
      bloodType: 'B+',
      governorate: 'Sfax',
      lastDonation: '2022-05-10',
      donationsCount: 7,
      phone: '55667788',
      email: 'samir.boukadida@example.com',
      status: 'inactive'
    }
  ]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    bloodType: '',
    governorate: '',
    status: ''
  });

  // Filter donors
  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         donor.cin.includes(searchTerm);
    const matchesBloodType = filters.bloodType ? donor.bloodType === filters.bloodType : true;
    const matchesGovernorate = filters.governorate ? donor.governorate === filters.governorate : true;
    const matchesStatus = filters.status ? donor.status === filters.status : true;
    
    return matchesSearch && matchesBloodType && matchesGovernorate && matchesStatus;
  });

  // Toggle donor status
  const toggleDonorStatus = (id) => {
    setDonors(donors.map(donor => 
      donor.id === id 
        ? { ...donor, status: donor.status === 'active' ? 'inactive' : 'active' } 
        : donor
    ));
  };

  return (
    <div className="donneurs-container">
      <h1 className="page-title">❤️ Gestion des Donneurs</h1>
      
      {/* Search and Filters */}
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Recherche par nom ou CIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select
            value={filters.bloodType}
            onChange={(e) => setFilters({...filters, bloodType: e.target.value})}
          >
            <option value="">Tous les types</option>
            {bloodTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <select
            value={filters.governorate}
            onChange={(e) => setFilters({...filters, governorate: e.target.value})}
          >
            <option value="">Toutes les régions</option>
            {governorates.map(gov => (
              <option key={gov} value={gov}>{gov}</option>
            ))}
          </select>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">Tous statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
      </div>
      
      {/* Donors Table */}
      <div className="donors-table">
        <div className="table-header">
          <div>Nom</div>
          <div>CIN</div>
          <div>Groupe</div>
          <div>Région</div>
          <div>Contact</div>
          <div>Dernier don</div>
          <div>Total dons</div>
          <div>Actions</div>
        </div>
        
        {filteredDonors.length > 0 ? (
          filteredDonors.map(donor => (
            <motion.div 
              key={donor.id}
              className="table-row"
              whileHover={{ backgroundColor: '#f9f9f9' }}
            >
              <div className="name-cell">{donor.name}</div>
              <div>{donor.cin}</div>
              <div className={`blood-type ${donor.bloodType.replace('+', 'pos').replace('-', 'neg')}`}>
                {donor.bloodType}
              </div>
              <div>{donor.governorate}</div>
              <div className="contact-cell">
                <div className="phone">{donor.phone}</div>
                <div className="email">{donor.email}</div>
              </div>
              <div>
                {donor.lastDonation 
                  ? new Date(donor.lastDonation).toLocaleDateString('fr-TN') 
                  : 'Jamais'}
              </div>
              <div>{donor.donationsCount}</div>
              <div className="actions-cell">
                <button 
                  className={`status-btn ${donor.status}`}
                  onClick={() => toggleDonorStatus(donor.id)}
                >
                  {donor.status === 'active' ? 'Désactiver' : 'Activer'}
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-results">
            Aucun donneur trouvé
          </div>
        )}
      </div>
      
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h3>Donneurs Actifs</h3>
          <p>{donors.filter(d => d.status === 'active').length}</p>
        </div>
        <div className="card">
          <h3>Donneurs Loyaux</h3>
          <p>{donors.filter(d => d.donationsCount >= 5).length}</p>
        </div>
      </div>
    </div>
  );
};

export default Donneurs;