'use client';
import { Position } from '@/interface/types';
import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { useMaps } from '@/hooks/useMaps';
import Search from '@/modules/posta/components/mapa/search/Search';

interface MapaProps {
  position: Position;
  setPosistion: (position: Position) => void;
}

export default function Mapa({ position, setPosistion }: MapaProps) {
  const { camaraProps, dataSeach, handleSelect, setLocation, setValue, value, handleCameraChange } =
    useMaps({
      position,
      disableInit: true,
    });
  return (
    <div className="h-[358px] w-full rounded-3xl">
      <header className="bg-ob-black-2 rounded-t-3xl p-3">
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
          borderBottomRightRadius: '24px',
          borderBottomLeftRadius: '24px',
          height: '280px',
        }}
        {...camaraProps}
        onClick={(e) => {
          setPosistion(e.detail.latLng ? e.detail.latLng : { lat: 0, lng: 0 });
        }}
        onCameraChanged={handleCameraChange}
      >
        <AdvancedMarker position={position}></AdvancedMarker>
      </Map>
    </div>
  );
}
