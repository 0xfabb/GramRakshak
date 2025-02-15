
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { DropletIcon, BookOpen, Thermometer, Building } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", water: 75, education: 85, climate: 65, jobs: 45 },
  { month: "Feb", water: 80, education: 82, climate: 68, jobs: 50 },
  { month: "Mar", water: 85, education: 88, climate: 72, jobs: 55 },
  { month: "Apr", water: 82, education: 90, climate: 70, jobs: 58 },
];

const stats = [
  { title: "Water Quality", value: "85%", icon: DropletIcon, color: "text-blue-500" },
  { title: "Education Progress", value: "78%", icon: BookOpen, color: "text-green-500" },
  { title: "Climate Action", value: "62%", icon: Thermometer, color: "text-orange-500" },
  { title: "Employment", value: "45%", icon: Building, color: "text-purple-500" },
];

const OverviewDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Overview Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Combined Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="water" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.2} 
                />
                <Area 
                  type="monotone" 
                  dataKey="education" 
                  stackId="2"
                  stroke="#22c55e" 
                  fill="#22c55e" 
                  fillOpacity={0.2} 
                />
                <Area 
                  type="monotone" 
                  dataKey="climate" 
                  stackId="3"
                  stroke="#f97316" 
                  fill="#f97316" 
                  fillOpacity={0.2} 
                />
                <Area 
                  type="monotone" 
                  dataKey="jobs" 
                  stackId="4"
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewDashboard;
