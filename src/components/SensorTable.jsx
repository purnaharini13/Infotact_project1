import "../styles/SensorTable.css";

function SensorTable() {
  const sensorData = [
    {
      sensor: "Temperature",
      value: "32°C",
      location: "Room A",
      status: "Normal",
    },
    {
      sensor: "Humidity",
      value: "68%",
      location: "Room B",
      status: "Stable",
    },
    {
      sensor: "Pressure",
      value: "1012 hPa",
      location: "Room C",
      status: "Normal",
    },
    {
      sensor: "Air Quality",
      value: "45 AQI",
      location: "Room D",
      status: "Good",
    },
  ];

  return (
    <section className="sensor-table-section">
      <h2>Recent Sensor Readings</h2>

      <table className="sensor-table">
        <thead>
          <tr>
            <th>Sensor</th>
            <th>Value</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {sensorData.map((sensor, index) => (
            <tr key={index}>
              <td>{sensor.sensor}</td>
              <td>{sensor.value}</td>
              <td>{sensor.location}</td>
              <td>{sensor.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default SensorTable;
