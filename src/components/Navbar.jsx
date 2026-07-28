import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>🌍 AtmoSync</h2>
        <span className="tagline">Real-Time IoT Monitoring & Analytics</span>
      </div>

      <div className="navbar-right">
        <span className="status">🟢 System Online</span>

        <span className="notification">🔔</span>

        <div className="profile">👤 Admin</div>
      </div>
    </nav>
  );
}

export default Navbar;
