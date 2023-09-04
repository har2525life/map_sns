import useMapHooks from "./hooks/useMapHooks";
import { useForm } from "react-hook-form";

interface PositionQueryType {
  query: string;
}

function MapPage() {
  const { register, handleSubmit } = useForm<PositionQueryType>();
  const { mapContainerRef, handleSearch, handleLocateMe } = useMapHooks();

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <form onSubmit={handleSubmit(handleSearch)}>
        <input {...register("query")} type="text" placeholder="場所を検索" />
        <button>検索</button>
      </form>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%" }}
      ></div>
      <button
        onClick={handleLocateMe}
        style={{ position: "absolute", bottom: 10, right: 10, zIndex: 10 }}
      >
        現在地
      </button>
    </div>
  );
}

export default MapPage;
