import { Map } from "maplibre-gl";
import { useEffect, useRef, RefObject } from "react";

interface UseMapReturnType {
  mapContainerRef: RefObject<HTMLDivElement>;
}

function useMapHooks(): UseMapReturnType {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainerRef.current === null) return;
    const map = new Map({
      container: mapContainerRef.current,
      style: "https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json",
      center: [139.767, 35.6812],
      zoom: 14,
    });
    return () => {
      map.remove();
    };
  }, []);
  return { mapContainerRef };
}

export default useMapHooks;
