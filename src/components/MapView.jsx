import { MapContainer, TileLayer, Rectangle, Popup, ZoomControl, LayerGroup, ScaleControl, useMap } from 'react-leaflet';
import { AlertTriangle, Map as MapIcon } from 'lucide-react';
import MapController from './MapController';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
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

export default function MapView({ regions, selectedRegion, analyses, initialBounds, getRiskColor }) {
  const currentRegion = regions[selectedRegion];
  const [activeRegion, setActiveRegion] = useState(null);

  const regionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 p-4 bg-white rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapIcon className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Risk Zone Analysis Map</h2>
        </div>
        <div className="flex space-x-2">
          {analyses.map((analysis) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={analysis.id}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg 
                       hover:bg-gray-200 transition-colors duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Analysis {analysis.id} ({analysis.date})
            </motion.button>
          ))}
        </div>
      </div>

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
    </motion.div>
  );
}