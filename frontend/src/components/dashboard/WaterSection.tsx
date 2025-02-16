import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { WaterQualityChart } from "../../components/charts/WaterQualityChart"

export function WaterSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Quality</CardTitle>
      </CardHeader>
      <CardContent>
        <WaterQualityChart />
      </CardContent>
    </Card>
  )
}

