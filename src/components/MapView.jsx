import { MapContainer, TileLayer, Rectangle, Popup, ZoomControl, LayerGroup, ScaleControl, useMap } from 'react-leaflet';
import { AlertTriangle, Map as MapIcon, Layers, Download, Share2 } from 'lucide-react';
import MapController from './MapController';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Custom component to handle map animations
function MapAnimator({ selectedRegion, regions }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedRegion && regions[selectedRegion]) {
      const region = regions[selectedRegion];
      const bounds = region.riskZones.reduce((acc, zone) => {
        if (!acc) return zone.bounds;
        return [
          [Math.min(acc[0][0], zone.bounds[0][0]), Math.min(acc[0][1], zone.bounds[0][1])],
          [Math.max(acc[1][0], zone.bounds[1][0]), Math.max(acc[1][1], zone.bounds[1][1])]
        ];
      }, null);

      map.flyToBounds(bounds, {
        duration: 2,
        easeLinearity: 0.25,
        animate: true,
        padding: [50, 50]
      });
    }
  }, [selectedRegion, regions, map]);

  return null;
}

export default function MapView({ regions, selectedRegion, analyses, initialBounds, getRiskColor, onNavigateBack }) {
  const currentRegion = regions[selectedRegion];
  const [activeRegion, setActiveRegion] = useState(null);
  const [showLegend, setShowLegend] = useState(true);
  const [activeLayer, setActiveLayer] = useState('risk'); // 'risk', 'satellite', 'terrain'
  const [filterLevel, setFilterLevel] = useState('all'); // 'all', 'high', 'medium', 'low'

  const regionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 p-6 bg-white rounded-xl shadow-lg"
    >
      {/* Enhanced Header Section */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-3">
          <MapIcon className="w-6 h-6 text-amber-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Risk Zone Analysis Map</h2>
            <p className="text-sm text-gray-500">Analyzing {currentRegion.name}</p>
          </div>
        </div>
        
        {/* Control Panel */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowLegend(!showLegend)}
            className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg
                     hover:bg-amber-100 transition-all duration-200 flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Toggle Legend
          </motion.button>

          <div className="flex items-center gap-2">
            <select
              value={activeLayer}
              onChange={(e) => setActiveLayer(e.target.value)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg
                       border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="risk">Risk Zones</option>
              <option value="satellite">Satellite</option>
              <option value="terrain">Terrain</option>
            </select>

            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg
                       border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Risks</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-2 text-gray-600 hover:text-amber-600 bg-gray-50 rounded-lg
                       hover:bg-amber-50 transition-all duration-200"
              title="Download Map"
            >
              <Download className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-2 text-gray-600 hover:text-amber-600 bg-gray-50 rounded-lg
                       hover:bg-amber-50 transition-all duration-200"
              title="Share Map"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Analysis Timeline */}
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-3">
          {analyses.map((analysis) => (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={analysis.id}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg 
                       hover:bg-amber-50 hover:text-amber-700 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-amber-500 whitespace-nowrap"
            >
              Analysis {analysis.id} ({analysis.date})
            </motion.button>
          ))}
        </div>
      </div>

      {/* Map Container with Legend */}
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-[700px] bg-gray-50 rounded-xl overflow-hidden relative z-0 shadow-inner"
        >
          <MapContainer
            bounds={initialBounds}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            zoomControl={false}
            zoomSnap={0.5}
            zoomDelta={0.5}
            className="z-0"
          >
            <MapAnimator selectedRegion={selectedRegion} regions={regions} />
            <ZoomControl position="bottomright" />
            <ScaleControl position="bottomleft" />
            <MapController region={selectedRegion} regions={regions} />
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayerGroup>
              {Object.values(regions).map((region, regionIndex) =>
                region.riskZones.map((zone, zoneIndex) => (
                  <motion.div
                    key={`${regionIndex}-${zoneIndex}`}
                    initial="hidden"
                    animate="visible"
                    variants={regionVariants}
                    transition={{ duration: 0.5, delay: zoneIndex * 0.1 }}
                  >
                    <Rectangle
                      bounds={zone.bounds}
                      pathOptions={{
                        color: getRiskColor(zone.risk),
                        fillOpacity: region.name === currentRegion.name 
                          ? activeRegion === region.name ? 0.8 : 0.6
                          : 0.3,
                        weight: region.name === currentRegion.name ? 3 : 1,
                        dashArray: region.name === currentRegion.name ? '' : '5, 5',
                      }}
                      eventHandlers={{
                        mouseover: () => setActiveRegion(region.name),
                        mouseout: () => setActiveRegion(null),
                      }}
                    >
                      <Popup className="custom-popup">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="p-2 min-w-[200px]"
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle
                              size={24}
                              className={`text-${
                                zone.risk === 'high'
                                  ? 'red'
                                  : zone.risk === 'medium'
                                  ? 'orange'
                                  : 'green'
                              }-500`}
                            />
                            <h3 className="font-semibold text-gray-800">
                              {region.name} Region
                            </h3>
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-sm text-gray-600">
                              Risk Level: <span className="capitalize font-medium text-gray-800">{zone.risk}</span>
                            </p>
                          </div>
                        </motion.div>
                      </Popup>
                    </Rectangle>
                  </motion.div>
                ))
              )}
            </LayerGroup>
          </MapContainer>
        </motion.div>

        {/* Floating Legend */}
        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg
                       border border-gray-200 w-64"
            >
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Risk Level Legend</h3>
              <div className="space-y-2">
                {['high', 'medium', 'low'].map((risk) => (
                  <div key={risk} className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: getRiskColor(risk) }}
                    />
                    <span className="text-sm text-gray-600 capitalize">{risk} Risk</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}