import "../styles/SensorTable.css";

function SensorTable({ sensorData }) {
  if (sensorData.length === 0) {
    return (
      <section className="sensor-table-section">
        <h2>Recent Sensor Readings</h2>
        <p className="no-data">No sensors found matching your search.</p>
      </section>
    );
  }
  return (
    <section className="sensor-table-section">
      <h2>Recent Sensor Readings</h2>

      <table className="sensor-table">
        <thead>
          <tr>
            <th>Sensor ID</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Pressure</th>
            <th>Air Quality</th>
            <th>Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {sensorData.slice(0, 10).map((sensor, index) => (
            <tr key={index}>
              <td>{sensor.sensor_id}</td>
              <td>{sensor.temperature} °C</td>
              <td>{sensor.humidity} %</td>
              <td>{sensor.pressure} hPa</td>
              <td>{sensor.air_quality} AQI</td>
              <td>{sensor.timestamp.split(".")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default SensorTable;
