import { MapContainer, TileLayer, Rectangle, Popup, ZoomControl } from 'react-leaflet';
import { AlertTriangle } from 'lucide-react';
import MapController from './MapController';
import 'leaflet/dist/leaflet.css';

export default function MapView({ regions, selectedRegion, analyses, initialBounds, getRiskColor }) {
  const currentRegion = regions[selectedRegion];

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-4">
        {analyses.map((analysis) => (
          <button
            key={analysis.id}
            className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
          >
            Analysis {analysis.id} ({analysis.date})
          </button>
        ))}
      </div>

      <div className="w-full h-[600px] bg-gray-200 rounded-lg overflow-hidden relative z-0">
        <MapContainer
          bounds={initialBounds}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={false}
          zoomSnap={0.5}
          zoomDelta={0.5}
        >
          <ZoomControl position="bottomright" />
          <MapController region={selectedRegion} regions={regions} />
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {Object.values(regions).map((region, regionIndex) =>
            region.riskZones.map((zone, zoneIndex) => (
              <Rectangle
                key={`${regionIndex}-${zoneIndex}`}
                bounds={zone.bounds}
                pathOptions={{
                  color: getRiskColor(zone.risk),
                  fillOpacity: region.name === currentRegion.name ? 0.5 : 0.2,
                  weight: region.name === currentRegion.name ? 2 : 1,
                }}
              >
                <Popup>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle
                      size={20}
                      className={`text-${
                        zone.risk === 'high'
                          ? 'red'
                          : zone.risk === 'medium'
                          ? 'orange'
                          : 'green'
                      }-500`}
                    />
                    <span className="capitalize">
                      {zone.risk} Risk Area in {region.name}
                    </span>
                  </div>
                </Popup>
              </Rectangle>
            ))
          )}
        </MapContainer>
      </div>
    </div>
  );
}