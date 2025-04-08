import { useState } from 'react';
import { LatLngBounds } from 'leaflet';
import React from 'react';
import { Map, BarChart3, Settings, AlertTriangle } from 'lucide-react';
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
      return '#dc2626';
    case 'medium':
      return '#ea580c';
    case 'low':
      return '#16a34a';
    default:
      return '#6b7280';
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
          'rgba(99, 102, 241, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(34, 197, 94, 0.6)',
          'rgba(249, 115, 22, 0.6)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(249, 115, 22, 1)',
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
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header generateNewAnalysis={generateNewAnalysis} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200">
          <div className="bg-slate-50 rounded-t-xl border-b border-slate-200">
            <nav className="flex px-4">
              {[
                { id: 'map', icon: Map, label: 'Risk Map' },
                { id: 'analytics', icon: BarChart3, label: 'Analytics' },
                { id: 'settings', icon: Settings, label: 'Settings' }
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-6 py-4 flex items-center space-x-2 transition-all duration-200 ${
                    activeTab === id
                      ? 'border-b-2 border-indigo-600 text-indigo-600 bg-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 bg-white border-b border-slate-200">
            <div className="flex items-center space-x-4">
              <div className="w-64">
                <label htmlFor="region" className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Region
                </label>
                <select
                  id="region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full text-black rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
                >
                  {Object.entries(regions).map(([key, region]) => (
                    <option key={key} value={key}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2 px-4 py-2 bg-slate-50 rounded-lg">
                <AlertTriangle className="text-amber-500" size={20} />
                <span className="text-sm font-medium text-slate-700">
                  Current Risk Level: {currentRegion.riskScores.current}%
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'map' && (
              <div className="rounded-lg overflow-hidden border border-slate-200 shadow-inner">
                <MapView
                  regions={regions}
                  selectedRegion={selectedRegion}
                  analyses={analyses}
                  initialBounds={initialBounds}
                  getRiskColor={getRiskColor}
                />
              </div>
            )}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Risk Factors Analysis</h3>
                    <AnalyticsView
                      currentRegion={currentRegion}
                      riskFactorsData={riskFactorsData}
                      historicalData={historicalData}
                      textClassName="text-slate-900"
                    />
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Historical Trend</h3>
                    <AnalyticsView
                      currentRegion={currentRegion}
                      riskFactorsData={riskFactorsData}
                      historicalData={historicalData}
                      textClassName="text-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Settings</h3>
                <p className="text-slate-600">Configure your preferences and notification settings here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}