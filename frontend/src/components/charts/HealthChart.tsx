
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", checkups: 65, vaccinations: 40 },
  { month: "Feb", checkups: 59, vaccinations: 55 },
  { month: "Mar", checkups: 80, vaccinations: 70 },
  { month: "Apr", checkups: 81, vaccinations: 60 },
  { month: "May", checkups: 56, vaccinations: 45 },
  { month: "Jun", checkups: 55, vaccinations: 50 },
]
const HealthChart=()=>{
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="checkups" fill="#8884d8" />
        <Bar dataKey="vaccinations" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default HealthChart;