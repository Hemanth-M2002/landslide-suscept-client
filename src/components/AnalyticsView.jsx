import { Bar, Line } from 'react-chartjs-2';

export default function AnalyticsView({ currentRegion, riskFactorsData, historicalData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Current Risk Score</h3>
          <p className="text-3xl font-bold text-blue-600">{currentRegion.riskScores.current}%</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">High Risk Areas</h3>
          <p className="text-3xl font-bold text-red-600">
            {currentRegion.riskZones.filter(z => z.risk === 'high').length}
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
          <p className="text-3xl font-bold text-gray-600">2h ago</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Risk Factors</h3>
        <Bar data={riskFactorsData} options={{ responsive: true }} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Risk Score Trend</h3>
        <Line data={historicalData} options={{ responsive: true }} />
      </div>
    </div>
  );
}