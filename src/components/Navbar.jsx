import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const navItems = [
    { path: '/', text: 'Tableau de bord', icon: '📊', badge: null },
    { path: '/analytiques', text: 'Analytiques', icon: '📊', badge: null },
    { path: '/donneurs', text: 'Donneurs', icon: '🩸', badge: 12 },
    { path: '/collectes', text: 'Collectes', icon: '💉', badge: 3 },
    { path: '/inventaire', text: 'Inventaire', icon: '🧪', badge: null },
    { path: '/rapports', text: 'Rapports', icon: '📑', badge: null },
    
  ];

  return (
    <motion.nav 
      className="navbar-medical"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="navbar-header">
        <div className="hospital-logo">
          <span className="pulse">❤️</span>
          <h2>Hémovigilance</h2>
        </div>
        <div className="hospital-info">
          <span>Centre Transfusion Sanguine</span>
          <span>Tunis, Tunisia</span>
        </div>
      </div>

      <ul className="nav-menu">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink 
              to={item.path} 
              className={({ isActive }) => 
                isActive ? 'nav-item active' : 'nav-item'
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.text}</span>
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar-footer">
        <div className="user-profile">
          <div className="avatar">AD</div>
          <div className="user-info">
            <strong>Admin</strong>
            <span>Administrateur</span>
          </div>
        </div>
        <button className="logout-btn">
          <span className="icon">⎋</span> Déconnexion
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;