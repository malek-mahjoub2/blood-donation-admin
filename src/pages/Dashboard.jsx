import { useState, useEffect } from 'react';
import BloodCard from '../components/BloodCard';
import AlertCenter from '../components/AlertCenter';

const Dashboard = () => {
  const [bloodStock, setBloodStock] = useState({
    'O+': 8, 'O-': 2, 'A+': 15, 'A-': 4, 
    'B+': 6, 'B-': 3, 'AB+': 5, 'AB-': 1
  });
  
  const [alerts, setAlerts] = useState([
    { id: 1, message: "O- CRITIQUE : Il ne reste que 2 unités !", priority: "critical", time: "2 mins ago" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
 
      setBloodStock(prev => ({
        ...prev,
        'O-': prev['O-'] - 1 
      }));
    }, 30000); 
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1>Tableau de bord des stocks de sang</h1>
      <div className="blood-grid">
        {Object.entries(bloodStock).map(([type, units]) => (
          <BloodCard key={type} type={type} units={units} threshold={5} />
        ))}
      </div>
      <AlertCenter alerts={alerts} />
    </div>
  );
};