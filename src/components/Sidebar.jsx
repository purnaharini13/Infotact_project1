import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Navigation</h3>

      <ul>
        <li>
          <a href="#dashboard">🏠 Dashboard</a>
        </li>

        <li>
          <a href="#analytics">📊 Analytics</a>
        </li>

        <li>
          <a href="#summary">📈 Summary</a>
        </li>

        <li>
          <a href="#sensors">📋 Sensor Data</a>
        </li>

        <li>
          <a href="#alerts">🚨 Alerts</a>
        </li>

        <li>
          <a href="#settings">⚙ Settings</a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
