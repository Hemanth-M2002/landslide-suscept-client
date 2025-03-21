import { Save } from 'lucide-react';

export default function Header({ generateNewAnalysis }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Landslide Susceptibility Mapping
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={generateNewAnalysis}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save size={18} />
              <span>Generate New Analysis</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}