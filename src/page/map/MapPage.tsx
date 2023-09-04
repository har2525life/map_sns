import useMapHooks from "./hooks/useMapHooks";

function MapPage() {
  const { mapContainerRef } = useMapHooks();
  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
}

export default MapPage;
