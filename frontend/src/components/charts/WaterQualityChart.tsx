
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { date: "2023-01", ph: 7.2, turbidity: 5, dissolvedOxygen: 8 },
  { date: "2023-02", ph: 7.1, turbidity: 4, dissolvedOxygen: 8.2 },
  { date: "2023-03", ph: 7.3, turbidity: 6, dissolvedOxygen: 7.8 },
  { date: "2023-04", ph: 7.0, turbidity: 5, dissolvedOxygen: 8.1 },
  { date: "2023-05", ph: 7.2, turbidity: 4, dissolvedOxygen: 8.3 },
  { date: "2023-06", ph: 7.4, turbidity: 3, dissolvedOxygen: 8.5 },
]

export function WaterQualityChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ph" stroke="#8884d8" />
        <Line type="monotone" dataKey="turbidity" stroke="#82ca9d" />
        <Line type="monotone" dataKey="dissolvedOxygen" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  )
}

