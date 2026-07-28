import "../styles/DashboardCard.css";

function DashboardCard({ title, value, unit, icon, status, color, trend }) {
  return (
    <div className="dashboard-card" style={{ borderTop: `5px solid ${color}` }}>
      <div className="card-top">
        <div className="card-icon" style={{ color }}>
          {icon}
        </div>

        <span className="status-badge" style={{ backgroundColor: color }}>
          {status}
        </span>
      </div>

      <h3>{title}</h3>

      <h1 className="card-value">
        {value}
        <span>{unit}</span>
      </h1>

      <p className="trend">{trend}</p>

      <p className="updated">Last updated: Just now</p>
    </div>
  );
}

export default DashboardCard;
