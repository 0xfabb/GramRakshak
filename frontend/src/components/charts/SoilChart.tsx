import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";
  import { ChartContainer } from "../../components/ui/chart";
  
  interface ChartData {
    date: string;
    moisture: number;
    ph: number;
    fertility: number;
  }
  
  interface Config {
    [key: string]: {
      label: string;
      color: string;
    };
  }
  
  interface SoilChartProps {
    data: ChartData[];
    config: Config;
  }
  
  const SoilChart: React.FC<SoilChartProps> = ({ data, config }) => {
    return (
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
              <Tooltip />
              {Object.keys(config).map((key) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={config[key].color}
                  fill={config[key].color}
                  fillOpacity={0.2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    );
  };
  
  export default SoilChart;
  