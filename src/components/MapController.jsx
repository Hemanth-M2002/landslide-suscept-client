import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

export default function MapController({ region, regions }) {
  const map = useMap();
  const currentRegion = regions[region];

  useEffect(() => {
    map.fitBounds(currentRegion.bounds, {
      padding: [50, 50],
      duration: 1.5,
      easeLinearity: 0.25
    });
  }, [region, map, currentRegion.bounds]);

  return null;
}