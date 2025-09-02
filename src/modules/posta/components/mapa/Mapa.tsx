"use client";
import { Position } from "@/interface/types";
import {
  AdvancedMarker,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Markers from "./marker/Marker";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Search from "./search/Search";

interface MapaProps {
  markers: Position[];
}

export default function Mapa({ markers }: MapaProps) {
  const [position, setPosistion] = useState<Position>({
    lat: -12.051631251341286,
    lng: -77.03434007801428,
  });

  const [camaraProps, setCameraProps] = useState<MapCameraProps>({
    center: position,
    zoom: 15,
  });
  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    setCameraProps(ev.detail);
  }, []);

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
    init,
  } = usePlacesAutocomplete({
    requestOptions: { region: "PE" },
    initOnMount: false,
  });
  const map = useMap();
  const placesLib = useMapsLibrary("places");

  useEffect(() => {
    if (!placesLib || !map) return;
    init();
  }, [placesLib, map]);

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setCameraProps({ center: { lat, lng }, zoom: 15 });
    setPosistion({ lat, lng });
  };

  const dataSeach = useMemo(() => {
    return status === "OK"
      ? data.map(({ description }) => {
          return { label: description, value: description };
        })
      : [{ label: "No hay resultados", value: "No hay resultados" }];
  }, [data]);

  const setLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosistion({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

      setCameraProps({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 15,
      });
    });
  };

  useEffect(() => {
    setLocation();
  }, []);

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
