import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function PressureChart({ data }) {
  return (
    <div className="chart-card">
      <h3>⚡ Pressure Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="sensor_id" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="pressure"
            stroke="#4CAF50"
            fill="#A5D6A7"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PressureChart;
