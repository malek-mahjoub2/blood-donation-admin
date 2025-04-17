import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AlertCenter.css';

const AlertCenter = () => {
  // Sample alerts data - replace with real API calls
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'O-',
      message: 'Stock critique: seulement 2 unités restantes',
      priority: 'high',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      resolved: false
    },
    {
      id: 2,
      type: 'A+',
      message: 'Niveau bas: 5 unités disponibles',
      priority: 'medium',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      resolved: false
    },
    {
      id: 3,
      type: 'AB+',
      message: 'Date d\'expiration proche: 3 unités expirent demain',
      priority: 'low',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      resolved: true
    }
  ]);

  // Mark alert as resolved
  const resolveAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  // Auto-refresh alerts (simulating real-time updates)
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, you would fetch from API here
      console.log('Checking for new alerts...');
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter unresolved alerts by priority
  const unresolvedAlerts = alerts.filter(alert => !alert.resolved);
  const highPriorityAlerts = unresolvedAlerts.filter(a => a.priority === 'high');
  const mediumPriorityAlerts = unresolvedAlerts.filter(a => a.priority === 'medium');
  const lowPriorityAlerts = unresolvedAlerts.filter(a => a.priority === 'low');

  return (
    <div className="alert-center">
      <div className="alert-header">
        <h3>🚨 Centre d'Alertes</h3>
        <span className="badge">{unresolvedAlerts.length}</span>
      </div>

      <div className="alert-tabs">
        <button className="active">Toutes ({unresolvedAlerts.length})</button>
        <button>Critiques ({highPriorityAlerts.length})</button>
        <button>Normales ({mediumPriorityAlerts.length})</button>
      </div>

      <div className="alert-list">
        <AnimatePresence>
          {unresolvedAlerts.map(alert => (
            <motion.div
              key={alert.id}
              className={`alert-item ${alert.priority}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="alert-type" style={{ backgroundColor: getColorForType(alert.type) }}>
                {alert.type}
              </div>
              <div className="alert-content">
                <p>{alert.message}</p>
                <small>
                  {formatTime(alert.timestamp)} • {getPriorityLabel(alert.priority)}
                </small>
              </div>
              <button 
                className="resolve-btn"
                onClick={() => resolveAlert(alert.id)}
              >
                Marquer comme résolu
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper functions
const getColorForType = (bloodType) => {
  const colors = {
    'O+': '#FF6B6B',
    'O-': '#FF2D2D',
    'A+': '#FF8E8E',
    'B+': '#FF5252',
    'AB+': '#FF7A7A'
  };
  return colors[bloodType] || '#c0392b';
};

const formatTime = (date) => {
  const now = new Date();
  const diffInHours = Math.floor((now - date) / 3600000);
  
  if (diffInHours < 1) {
    const mins = Math.floor((now - date) / 60000);
    return `Il y a ${mins} min`;
  } else if (diffInHours < 24) {
    return `Il y a ${diffInHours} h`;
  } else {
    return date.toLocaleDateString('fr-FR');
  }
};

const getPriorityLabel = (priority) => {
  const labels = {
    high: 'Urgent',
    medium: 'Important',
    low: 'Normale'
  };
  return labels[priority];
};

export default AlertCenter;