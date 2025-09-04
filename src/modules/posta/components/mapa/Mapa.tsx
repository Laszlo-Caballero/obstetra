"use client";
import { Position } from "@/interface/types";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import Markers from "./marker/Marker";
import Search from "./search/Search";
import { useMaps } from "@/hooks/useMaps";

interface MapaProps {
  markers: Position[];
}

export default function Mapa({ markers }: MapaProps) {
  const {
    camaraProps,
    dataSeach,
    handleSelect,
    position,
    setLocation,
    setValue,
    value,
    handleCameraChange,
    setPosistion,
  } = useMaps();
  return (
    <div className="w-full h-[358px] rounded-3xl">
      <header className="p-3 bg-ob-black-2 rounded-t-3xl">
        <Search
          onChange={(value) => {
            setValue(value);
            handleSelect(value);
          }}
          values={dataSeach}
          value={value}
          onClickButton={setLocation}
        />
      </header>

      <Map
        mapId="e4ce84c3f2e1437a"
        style={{
          borderBottomRightRadius: "24px",
          borderBottomLeftRadius: "24px",
          height: "280px",
        }}
        {...camaraProps}
        onClick={(e) => {
          setPosistion(e.detail.latLng ? e.detail.latLng : { lat: 0, lng: 0 });
        }}
        onCameraChanged={handleCameraChange}
      >
        <AdvancedMarker position={position}></AdvancedMarker>
        <Markers visibleMarkers={markers} />
      </Map>
    </div>
  );
}
