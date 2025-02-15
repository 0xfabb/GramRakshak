
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  ChartContainer,
} from "../../components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { AlertTriangle, Droplet, ThermometerIcon, Activity } from "lucide-react";

const data = [
  { date: "2024-01", ph: 7.2, turbidity: 1.2, temperature: 25 },
  { date: "2024-02", ph: 7.1, turbidity: 1.1, temperature: 24 },
  { date: "2024-03", ph: 7.3, turbidity: 1.3, temperature: 26 },
  { date: "2024-04", ph: 7.0, turbidity: 1.0, temperature: 23 },
];

const config = {
  ph: { label: "pH Level", color: "#22c55e" },
  turbidity: { label: "Turbidity", color: "#f97316" },
  temperature: { label: "Temperature", color: "#8b5cf6" },
};

const WaterDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Water Quality Dashboard</h1>
        <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg">
          <AlertTriangle className="h-5 w-5" />
          <span>1 Quality Alert</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">pH Level</CardTitle>
            <Droplet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2</div>
            <p className="text-xs text-muted-foreground">Normal range: 6.5-8.5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Turbidity</CardTitle>
            <Activity className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 NTU</div>
            <p className="text-xs text-muted-foreground">
              Below threshold: 5 NTU
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <ThermometerIcon className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25°C</div>
            <p className="text-xs text-muted-foreground">
              Optimal range: 20-30°C
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Water Quality Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Date
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {label}
                                </span>
                              </div>
                              {payload.map((item) => (
                                <div key={item.name} className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    {config[item.name as keyof typeof config]?.label}
                                  </span>
                                  <span className="font-bold" style={{ color: item.color }}>
                                    {item.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ph"
                    stackId="1"
                    stroke={config.ph.color}
                    fill={config.ph.color}
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="turbidity"
                    stackId="2"
                    stroke={config.turbidity.color}
                    fill={config.turbidity.color}
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="temperature"
                    stackId="3"
                    stroke={config.temperature.color}
                    fill={config.temperature.color}
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterDashboard;
