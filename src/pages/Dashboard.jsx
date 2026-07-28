import Navbar from "../components/Navbar";
import SensorTable from "../components/SensorTable";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import AlertPanel from "../components/AlertPanel";
import { FaTemperatureHigh, FaTint, FaWind } from "react-icons/fa";
import { MdSpeed } from "react-icons/md";
import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await API.get("/sensors/");
        setSensorData(response.data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    const fetchAlerts = async () => {
      try {
        const response = await API.get("/alerts/");
        setAlerts(response.data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchSensorData();
    fetchAlerts();
  }, []);
  const [kpi, setKpi] = useState({
    average_temperature: 0,
    average_humidity: 0,
    average_pressure: 0,
    average_air_quality: 0,
    total_records: 0,
  });

  useEffect(() => {
    async function fetchKpi() {
      try {
        const response = await API.get("/kpi");
        setKpi(response.data);
      } catch (error) {
        console.error("Error fetching KPI:", error);
      }
    }

    fetchKpi();
  }, []);
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

          {/* Today's Summary Section */}

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
          <section id="sensors">
            <SensorTable />
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
