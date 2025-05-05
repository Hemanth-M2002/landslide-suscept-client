import { Save } from 'lucide-react';

export default function Header({ generateNewAnalysis }) {
  return (
    <header className="bg-stone-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-800 text-center sm:text-left">
              Landslide Susceptibility Mapping
            </h1>
          </div>
          <div className="flex items-center w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={generateNewAnalysis}
              className="w-full sm:w-auto px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 flex items-center justify-center space-x-2"
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