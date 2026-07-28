import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AirQualityChart({ data }) {
  return (
    <div className="chart-card">
      <h3>🌬 Air Quality Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="sensor_id" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="air_quality"
            stroke="#9C27B0"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AirQualityChart;
