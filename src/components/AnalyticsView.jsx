import { Bar, Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

export default function AnalyticsView({ currentRegion, riskFactorsData, historicalData }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize to adjust chart options
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust chart options based on screen size
  const getChartOptions = (title) => {
    const isMobile = windowWidth < 768;
    
    return {
      responsive: true,
      maintainAspectRatio: !isMobile,
      aspectRatio: isMobile ? 1 : 2,
      plugins: {
        legend: {
          position: isMobile ? 'bottom' : 'top',
          labels: {
            boxWidth: isMobile ? 10 : 40,
            font: {
              size: isMobile ? 10 : 12
            }
          }
        },
        title: {
          display: true,
          text: title,
          font: {
            size: isMobile ? 14 : 16
          }
        },
        tooltip: {
          titleFont: {
            size: isMobile ? 12 : 14
          },
          bodyFont: {
            size: isMobile ? 11 : 13
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: isMobile ? 10 : 12
            },
            maxRotation: isMobile ? 45 : 0
          }
        },
        y: {
          ticks: {
            font: {
              size: isMobile ? 10 : 12
            }
          }
        }
      }
    };
  };

  return (
    <div className="space-y-6 text-black">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg text-black font-semibold mb-2">Current Risk Score</h3>
          <p className="text-3xl font-bold text-blue-600">{currentRegion.riskScores.current}%</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg  font-semibold mb-2">High Risk Areas</h3>
          <p className="text-3xl font-bold text-red-600">
            {currentRegion.riskZones.filter(z => z.risk === 'high').length}
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
          <p className="text-3xl font-bold text-gray-600">2h ago</p>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2 sm:mb-4">Risk Factors</h3>
        <div className="h-[300px] sm:h-[400px]">
          <Bar 
            data={riskFactorsData} 
            options={getChartOptions('Risk Factors Distribution')} 
          />
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2 sm:mb-4">Risk Score Trend</h3>
        <div className="h-[300px] sm:h-[400px]">
          <Line 
            data={historicalData} 
            options={getChartOptions('Historical Risk Score Trends')} 
          />
        </div>
      </div>
    </div>
  );
}