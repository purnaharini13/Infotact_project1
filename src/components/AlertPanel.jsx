import "../styles/AlertPanel.css";

function AlertPanel() {
  const alerts = [
    {
      id: 1,
      title: "High Temperature",
      message: "Sensor A exceeded 30°C",
      level: "High",
    },
    {
      id: 2,
      title: "Low Humidity",
      message: "Sensor B dropped below 40%",
      level: "Medium",
    },
  ];

  return (
    <section className="alert-section">
      <h2>🚨 Active Alerts</h2>

      {alerts.map((alert) => (
        <div key={alert.id} className="alert-card">
          <h3>{alert.title}</h3>
          <p>{alert.message}</p>
          <span className="alert-level">{alert.level}</span>
        </div>
      ))}
    </section>
  );
}

export default AlertPanel;
