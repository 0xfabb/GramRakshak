import SoilChart from "../../components/charts/SoilChart";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { AlertTriangle, Droplet, Sprout, Wheat } from "lucide-react";

const data = [
  { date: "2024-01", moisture: 40, ph: 6.8, fertility: 70 },
  { date: "2024-02", moisture: 42, ph: 7.0, fertility: 72 },
  { date: "2024-03", moisture: 38, ph: 6.5, fertility: 68 },
  { date: "2024-04", moisture: 45, ph: 7.2, fertility: 75 },
];

const config = {
  moisture: { label: "Moisture Level", color: "#22c55e" },
  ph: { label: "pH Level", color: "#f97316" },
  fertility: { label: "Soil Fertility", color: "#8b5cf6" },
};

const SoilDashboard = () => {
  const analyzeSoil = async () => {
    try {
      const response = await fetch("/api/analyze-soil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      const result = await response.json();
      alert(`Predicted Soil Quality: ${result.quality}`);
    } catch (error) {
      console.error("Error analyzing soil:", error);
      alert("Failed to analyze soil quality. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Soil Quality Dashboard</h1>
        <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg">
          <AlertTriangle className="h-5 w-5" />
          <span>1 Quality Alert</span>
        </div>
      </div>

      {/* Key Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Moisture Level</CardTitle>
            <Droplet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">40%</div>
            <p className="text-xs text-muted-foreground">Optimal range: 30-60%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">pH Level</CardTitle>
            <Sprout className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.8</div>
            <p className="text-xs text-muted-foreground">Ideal range: 6.0-7.5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Soil Fertility</CardTitle>
            <Wheat className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">70%</div>
            <p className="text-xs text-muted-foreground">Higher values indicate better fertility</p>
          </CardContent>
        </Card>
      </div>

      {/* Soil Quality Trends Chart with extra bottom margin */}
     

      {/* Analysis Section Below the Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Soil Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <button
            onClick={analyzeSoil}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Analyze Soil Quality
          </button>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Soil Quality Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <SoilChart data={data} config={config} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SoilDashboard;
