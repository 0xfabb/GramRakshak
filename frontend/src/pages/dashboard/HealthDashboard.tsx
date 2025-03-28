import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Heart, Upload } from "lucide-react";

const HealthDashboard = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<{ label: string; score: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await axios.post("http://localhost:8001/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      const predictions = response.data.predictions;
      if (predictions.length > 0) {
        const bestPrediction = predictions[0];
        setPrediction(bestPrediction.score > 0.8 ? bestPrediction : null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Healthcare</h1>
        <div className="flex items-center gap-2 text-primary bg-primary-50 px-4 py-2 rounded-lg">
          <Heart className="h-5 w-5" />
          <span>Health Metrics</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Skin Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
            disabled={!selectedImage || loading}
          >
            <Upload className="h-5 w-5" /> {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>
        </CardContent>
      </Card>

      {prediction ? (
        <Card>
          <CardHeader>
            <CardTitle>Prediction Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Disease: {prediction.label}</p>
            <p className="text-sm text-gray-500">Confidence: {(prediction.score * 100).toFixed(2)}%</p>
          </CardContent>
        </Card>
      ) : (
        <p className="text-gray-500 text-sm">No high-confidence prediction. Please consult a doctor.</p>
      )}
    </div>
  );
};

export default HealthDashboard;
