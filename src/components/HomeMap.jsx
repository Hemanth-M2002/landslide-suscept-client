import { useState } from 'react';
import { LatLngBounds } from 'leaflet';
import React from 'react';
import { Map, BarChart3, Settings } from 'lucide-react';
import Header from './Header';
import MapView from './MapView';
import AnalyticsView from './AnalyticsView';

// Chart.js imports remain the same as in original code
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Region data remains the same as in original code
const regions = {
  coonoor: {
    name: 'Coonoor, Tamil Nadu',
    center: [11.3530, 76.7959],
    bounds: new LatLngBounds(
      [11.3430, 76.7859],
      [11.3630, 76.8059]
    ),
    riskZones: [
      { bounds: [[11.3480, 76.7900], [11.3500, 76.7920]], risk: 'high' },
      { bounds: [[11.3520, 76.7940], [11.3540, 76.7960]], risk: 'medium' },
      { bounds: [[11.3560, 76.7980], [11.3580, 76.8000]], risk: 'low' },
    ],
    riskScores: {
      current: 75,
      historical: [65, 70, 72, 68, 75],
      factors: {
        rainfall: 80,
        slope: 70,
        vegetation: 60,
        geology: 75,
      },
    },
  },
  ooty: {
    name: 'Ooty, Tamil Nadu',
    center: [11.4102, 76.6950],
    bounds: new LatLngBounds(
      [11.4002, 76.6850],
      [11.4202, 76.7050]
    ),
    riskZones: [
      { bounds: [[11.4050, 76.6900], [11.4070, 76.6920]], risk: 'high' },
      { bounds: [[11.4090, 76.6930], [11.4110, 76.6950]], risk: 'medium' },
      { bounds: [[11.4130, 76.6960], [11.4150, 76.6980]], risk: 'low' },
    ],
    riskScores: {
      current: 82,
      historical: [70, 75, 78, 80, 82],
      factors: {
        rainfall: 85,
        slope: 80,
        vegetation: 70,
        geology: 80,
      },
    },
  },
  kodaikanal: {
    name: 'Kodaikanal, Tamil Nadu',
    center: [10.2381, 77.4892],
    bounds: new LatLngBounds(
      [10.2281, 77.4792],
      [10.2481, 77.4992]
    ),
    riskZones: [
      { bounds: [[10.2330, 77.4840], [10.2350, 77.4860]], risk: 'high' },
      { bounds: [[10.2370, 77.4870], [10.2390, 77.4890]], risk: 'medium' },
      { bounds: [[10.2410, 77.4900], [10.2430, 77.4920]], risk: 'low' },
    ],
    riskScores: {
      current: 68,
      historical: [60, 63, 65, 67, 68],
      factors: {
        rainfall: 70,
        slope: 65,
        vegetation: 75,
        geology: 65,
      },
    },
  },
};

const getRiskColor = (risk) => {
  switch (risk) {
    case 'high':
      return '#ef4444'; // Red
    case 'medium':
      return '#f97316'; // Orange
    case 'low':
      return '#22c55e'; // Green
    default:
      return '#gray';
  }
};

export default function HomeMap() {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedRegion, setSelectedRegion] = useState('coonoor');
  const [analyses, setAnalyses] = useState([
    { id: '1', date: '2024-02-15', region: 'coonoor' },
  ]);

  const currentRegion = regions[selectedRegion];
  const initialBounds = React.useMemo(() => {
    const bounds = new LatLngBounds();
    Object.values(regions).forEach((region) => {
      bounds.extend(region.bounds);
    });
    return bounds;
  }, []);

  const generateNewAnalysis = () => {
    const newAnalysis = {
      id: (analyses.length + 1).toString(),
      date: new Date().toISOString().split('T')[0],
      region: selectedRegion,
    };
    setAnalyses([...analyses, newAnalysis]);
  };

  const riskFactorsData = {
    labels: ['Rainfall', 'Slope', 'Vegetation', 'Geology'],
    datasets: [
      {
        label: 'Risk Factors',
        data: Object.values(currentRegion.riskScores.factors),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(75, 192, 192, 0.6)', // Green
          'rgba(255, 159, 64, 0.6)', // Orange
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const historicalData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Risk Score Trend',
        data: currentRegion.riskScores.historical,
        borderColor: 'rgb(75, 192, 192)', // Green
        tension: 0.1,
        fill: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header generateNewAnalysis={generateNewAnalysis} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('map')}
                className={`px-6 py-4 flex items-center space-x-2 ${
                  activeTab === 'map'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Map size={20} />
                <span>Landslide Risk Map</span>
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-4 flex items-center space-x-2 ${
                  activeTab === 'analytics'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <BarChart3 size={20} />
                <span>Landslide Analytics</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-4 flex items-center space-x-2 ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Settings size={20} />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          <div className="p-4 border-b border-gray-200">
            <div className="w-64">
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                Select Region
              </label>
              <select
                id="region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {Object.entries(regions).map(([key, region]) => (
                  <option key={key} value={key}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'map' && (
              <MapView
                regions={regions}
                selectedRegion={selectedRegion}
                analyses={analyses}
                initialBounds={initialBounds}
                getRiskColor={getRiskColor}
              />
            )}
            {activeTab === 'analytics' && (
              <AnalyticsView
                currentRegion={currentRegion}
                riskFactorsData={riskFactorsData}
                historicalData={historicalData}
              />
            )}
            {activeTab === 'settings' && (
              <div>Settings content goes here</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}