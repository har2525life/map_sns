import { Map, Marker } from "maplibre-gl";
import { useEffect, useRef, RefObject, useState } from "react";
import { geocode } from "../../../lib/geocoding";

interface UseMapReturnType {
  mapContainerRef: RefObject<HTMLDivElement>;
  handleSearch: (coords: PositionQueryType) => void;
  handleLocateMe: () => void;
}

interface PositionQueryType {
  query: string;
}

function useMapHooks(): UseMapReturnType {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [marker, setMarker] = useState<Marker | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !map) {
      const initialMap = new Map({
        container: mapContainerRef.current,
        style: "https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json",
        center: [139.767, 35.6812],
        zoom: 16,
      });
      setMap(initialMap);
    }

    return () => {
      map?.remove();
    };
  }, [map]);

  const setMarkerCoords = (coords: [number, number]) => {
    if (map) {
      if (marker) marker.remove();
      const newMarker = new Marker().setLngLat(coords).addTo(map);
      setMarker(newMarker);

      map.flyTo({ center: coords, zoom: 18 });
    }
  };

  const handleSearch = async (event: PositionQueryType) => {
    const { query } = event;
    if (typeof query === "string") {
      const coords = await geocode(query);
      if (coords) {
        setMarkerCoords(coords);
      }
    }
  };

  const handleLocateMe = async () => {
    try {
      const coords = await getCurrentPosition();
      if (map) {
        map.flyTo({ center: coords });
        if (marker) marker.remove();
        const newMarker = new Marker().setLngLat(coords).addTo(map);
        setMarker(newMarker);
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const getCurrentPosition = (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  return { mapContainerRef, handleSearch, handleLocateMe };
}

export default useMapHooks;
