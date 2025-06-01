import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { latLng } from "leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [lat, lng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const { cities } = useCities();

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([Number(lat), Number(lng)]);
    }
  }, [lat, lng]);

  useEffect(
    function () {
      if (geoLocationPosition) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      }
    },
    [geoLocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={9}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapPosition} />
        {/* USE MY LOCATION */}
        {geoLocationPosition && (
          <Marker position={[geoLocationPosition.lat, geoLocationPosition.lng]}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      // console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
