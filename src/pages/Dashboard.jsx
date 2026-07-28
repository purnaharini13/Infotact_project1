import Navbar from "../components/Navbar";
import SensorTable from "../components/SensorTable";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import AlertPanel from "../components/AlertPanel";
import { FaTemperatureHigh, FaTint, FaWind } from "react-icons/fa";
import { MdSpeed } from "react-icons/md";
import { useEffect, useState } from "react";
import API from "../services/api";
import TemperatureChart from "../components/charts/TemperatureChart";
import HumidityChart from "../components/charts/HumidityChart";
import PressureChart from "../components/charts/PressureChart";
import AirQualityChart from "../components/charts/AirQualityChart";
import "../styles/Dashboard.css";

function Dashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [kpi, setKpi] = useState({
    average_temperature: 0,
    average_humidity: 0,
    average_pressure: 0,
    average_air_quality: 0,
    total_records: 0,
  });

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/sensor-data");
        setSensorData(response.data);
      } catch (err) {
        console.error("Error fetching sensor data:", err);
        setError("Unable to load sensor data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAlerts = async () => {
      try {
        const response = await API.get("/alerts/");
        setAlerts(response.data);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    const fetchKpi = async () => {
      try {
        const response = await API.get("/kpi");
        setKpi(response.data);
      } catch (err) {
        console.error("Error fetching KPI:", err);
      }
    };

    fetchSensorData();
    fetchAlerts();
    fetchKpi();
  }, []);

  const filteredSensorData = sensorData.filter((sensor) =>
    sensor.sensor_id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading sensor data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content" id="dashboard">
          <h1>Dashboard Overview</h1>

          <div className="cards" id="analytics">
            <DashboardCard
              title="Temperature"
              value={kpi.average_temperature}
              unit="°C"
              icon={<FaTemperatureHigh />}
              status="Normal"
              color="#2E7D32"
              trend="↑ +2% since last hour"
            />

            <DashboardCard
              title="Humidity"
              value={kpi.average_humidity}
              unit="%"
              icon={<FaTint />}
              status="Stable"
              color="#1565C0"
              trend="↓ -1% since last hour"
            />

            <DashboardCard
              title="Pressure"
              value={kpi.average_pressure}
              unit="hPa"
              icon={<MdSpeed />}
              status="Normal"
              color="#2E7D32"
              trend="↑ Stable"
            />

            <DashboardCard
              title="Air Quality"
              value={kpi.average_air_quality}
              unit="AQI"
              icon={<FaWind />}
              status="Good"
              color="#00897B"
              trend="Good Air Quality"
            />
          </div>

          <section className="summary-section" id="summary">
            <h2>Today's Summary</h2>

            <div className="summary-grid">
              <div className="summary-box">
                <h3>Total Sensors</h3>
                <p>120</p>
              </div>

              <div className="summary-box">
                <h3>Healthy Sensors</h3>
                <p>118</p>
              </div>

              <div className="summary-box">
                <h3>Active Alerts</h3>
                <p>2</p>
              </div>

              <div className="summary-box">
                <h3>Last Updated</h3>
                <p>Just Now</p>
              </div>
            </div>
          </section>

          <section id="analytics" className="analytics-section">
            <h2>Analytics Dashboard</h2>

            <div className="charts-grid">
              <TemperatureChart data={sensorData} />
              <HumidityChart data={sensorData} />
              <PressureChart data={sensorData} />
              <AirQualityChart data={sensorData} />
            </div>
          </section>

          <section id="sensors">
            <div className="sensor-toolbar">
              <input
                type="text"
                placeholder="🔍 Search Sensor ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />

              <button className="clear-btn" onClick={() => setSearchTerm("")}>
                ✖ Clear
              </button>

              <button
                className="refresh-btn"
                onClick={() => window.location.reload()}
              >
                🔄 Refresh
              </button>
            </div>

            <p className="sensor-count">
              Showing {filteredSensorData.length} of {sensorData.length} sensors
            </p>

            <SensorTable sensorData={filteredSensorData} />
          </section>

          <section id="alerts">
            <AlertPanel />
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
