import { motion } from 'framer-motion';
import './BloodCard.css';

const BloodCard = ({ type, units, threshold = 5, icon, color }) => {
  const isCritical = units < threshold;
  const fillPercentage = Math.min((units / 20) * 100, 100);

  return (
    <motion.div 
      className={`blood-card ${isCritical ? 'critical' : ''}`}
      whileHover={{ y: -5 }}
      style={{ '--blood-color': color }}
    >
      <div className="card-header">
        <span className="blood-icon">{icon}</span>
        <h3>{type}</h3>
        <span className="blood-badge">{units} UNITÉS</span>
      </div>

      <div className="blood-visualization">
        <div className="blood-drop" style={{ '--fill-level': `${fillPercentage}%` }}>
          <div className="liquid-fill"></div>
          {isCritical && <div className="emergency-pulse"></div>}
        </div>
      </div>

      {isCritical ? (
        <motion.button
          className="emergency-btn"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="alert-icon">🚨</span> DEMANDE URGENTE
        </motion.button>
      ) : (
        <div className="stability-indicator">
          <span className="check-icon">✓</span> Stock Stable
        </div>
      )}
    </motion.div>
  );
};

export default BloodCard;