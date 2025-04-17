// RapportPage.jsx
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert, Table, Statistic, notification } from 'antd';
import { BloodTypeChart, StockHistoryChart } from '../components';

const RapportPage = () => {
  const [bloodStock, setBloodStock] = useState({
    'A+': 15,
    'A-': 8,
    'B+': 12,
    'B-': 5,
    'AB+': 9,
    'AB-': 3,
    'O+': 20,
    'O-': 7
  });
  const [thresholds, setThresholds] = useState({
    critical: 5,
    warning: 10
  });
  const [alerts, setAlerts] = useState([]);

  // Check stock levels periodically
  useEffect(() => {
    const interval = setInterval(() => {
      checkStockLevels();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [bloodStock]);

  const checkStockLevels = () => {
    const newAlerts = [];
    Object.entries(bloodStock).forEach(([type, quantity]) => {
      if (quantity <= thresholds.critical) {
        newAlerts.push({
          type: 'critical',
          message: `Critical stock level for ${type} (${quantity} units)`,
          bloodType: type
        });
      } else if (quantity <= thresholds.warning) {
        newAlerts.push({
          type: 'warning',
          message: `Low stock warning for ${type} (${quantity} units)`,
          bloodType: type
        });
      }
    });

    if (newAlerts.length > 0) {
      setAlerts(newAlerts);
      showNotifications(newAlerts);
    } else {
      setAlerts([]);
    }
  };

  const showNotifications = (alerts) => {
    alerts.forEach(alert => {
      notification[alert.type]({
        message: 'Blood Stock Alert',
        description: alert.message,
        duration: 0 // Requires manual close
      });
    });
  };

  const columns = [
    {
      title: 'Blood Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Current Stock',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <span style={{
          color: quantity <= thresholds.critical ? 'red' : 
                quantity <= thresholds.warning ? 'orange' : 'green'
        }}>
          {quantity} units
        </span>
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        record.quantity <= thresholds.critical ? 'Critical' :
        record.quantity <= thresholds.warning ? 'Warning' : 'Normal'
      )
    }
  ];

  const data = Object.entries(bloodStock).map(([type, quantity]) => ({
    key: type,
    type,
    quantity
  }));

  return (
    <div className="rapport-page">
      <h1>Blood Stock Management</h1>
      
      {/* Current Stock Overview */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {Object.entries(bloodStock).map(([type, quantity]) => (
          <Col span={6} key={type}>
            <Card>
              <Statistic
                title={`Blood Type ${type}`}
                value={quantity}
                suffix="units"
                valueStyle={{
                  color: quantity <= thresholds.critical ? 'red' : 
                        quantity <= thresholds.warning ? 'orange' : 'green'
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>
      
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h2>Active Alerts</h2>
          {alerts.map((alert, index) => (
            <Alert
              key={index}
              message={alert.message}
              type={alert.type}
              showIcon
              closable
            />
          ))}
        </div>
      )}
      
      {/* Blood Stock Table */}
      <Card title="Detailed Blood Stock">
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={false}
        />
      </Card>
      
      {/* Visualization Section */}
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Current Blood Stock Distribution">
            <BloodTypeChart data={bloodStock} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Stock History (Last 30 Days)">
            <StockHistoryChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RapportPage;