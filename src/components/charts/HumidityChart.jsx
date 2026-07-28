import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function HumidityChart({ data }) {
  return (
    <div className="chart-card">
      <h3>💧 Humidity Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="sensor_id" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="humidity" fill="#2196F3" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HumidityChart;
