import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { memo } from "react";
import { Position } from "@/interface/types";
import { FaMapMarkerAlt } from "react-icons/fa";

interface PropsMarkers {
  visibleMarkers: Position[];
}

const Markers = memo(function Markers({ visibleMarkers }: PropsMarkers) {
  return visibleMarkers.map((marker, index) => {
    return (
      <AdvancedMarker
        position={{
          lat: marker.lat,
          lng: marker.lng,
        }}
        key={index}
        className="animate-bounce animate-fill-forwards animate-once"
      >
        <FaMapMarkerAlt className="text-ob-red size-11" />
      </AdvancedMarker>
    );
  });
});

export default Markers;
