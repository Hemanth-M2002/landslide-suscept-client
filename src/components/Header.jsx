import { Save } from 'lucide-react';

export default function Header({ generateNewAnalysis }) {
  return (
    <header className="bg-stone-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-stone-800">
            Landslide Susceptibility Mapping
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={generateNewAnalysis}
              className="px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 flex items-center space-x-2"
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