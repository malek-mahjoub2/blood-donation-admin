import { useState, useEffect } from 'react';
import BloodCard from '../components/BloodCard';
import AlertCenter from '../components/AlertCenter';

const Dashboard = () => {
  const [bloodStock, setBloodStock] = useState({
    'O+': 8, 'O-': 2, 'A+': 15, 'A-': 4, 
    'B+': 6, 'B-': 3, 'AB+': 5, 'AB-': 1
  });
  
  const [alerts, setAlerts] = useState([
    { id: 1, message: "O- CRITICAL: 2 units left!", priority: "critical", time: "2 mins ago" }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch API data here later
      setBloodStock(prev => ({
        ...prev,
        'O-': prev['O-'] - 1 // Simulate depletion
      }));
    }, 30000); // Update every 30 sec
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1>Blood Stock Dashboard</h1>
      <div className="blood-grid">
        {Object.entries(bloodStock).map(([type, units]) => (
          <BloodCard key={type} type={type} units={units} threshold={5} />
        ))}
      </div>
      <AlertCenter alerts={alerts} />
    </div>
  );
};