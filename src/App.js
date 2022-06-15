import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet";

import backgroundImg from "./images/pattern-bg.png";
import arrowIcon from "./images/icon-arrow.svg";
import { map } from "leaflet";

function App() {
  const [searchBtn, setSearchBtn] = useState(true);
  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [isp, setIsp] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [position, setPosition] = useState([9.0764785, 7.398574]);

  useEffect(() => {
    fetch("https://ipwho.is/" + ipAddress)
      .then((res) => res.json())
      .then((data) => {
        setIpAddress(data.ip);
        setTimeZone(data.timezone.utc);
        setLocation(data.city + "," + data.region);
        setIsp(data.connection.isp);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setPosition([data.latitude, data.longitude]);
      });
  }, [searchBtn, latitude]);

  function MyMarker() {
    const map = useMap();
    console.log("map center:", map.getCenter());
    map.flyTo([latitude, longitude], 12);

    return (
      <Marker position={[latitude, longitude]}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <div className="App">
      <header>
        <div className="absolute">
          <h1>IP Address Tracker</h1>
          <div className="address-div">
            <input
              className="address-input"
              name="Ip Address"
              value={ipAddress}
              onChange={(e) => {
                setIpAddress(e.target.value);
                console.log(e);
              }}
            />

            <button
              onClick={() => {
                setSearchBtn((prevState) => !prevState);
              }}
            >
              <img src={arrowIcon}></img>
            </button>
          </div>

          <div className="info">
            <div className="section">
              <h2>IP ADDRESS</h2>
              <p>{ipAddress}</p>
            </div>
            <div className="bars"></div>
            <div className="section">
              <h2>LOCATION</h2>
              <p>{location}</p>
            </div>
            <div className="bars"></div>
            <div className="section">
              <h2>TIME ZONE</h2>
              <p>UTC {timeZone}</p>
            </div>
            <div className="bars"></div>
            <div className="section">
              <h2>ISP</h2>
              <p>{isp}</p>
            </div>
          </div>
        </div>
      </header>

      {latitude && (
        <MapContainer
          center={{ lat: latitude, lng: longitude }}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "100vw", height: "80vh" }}
        >
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            url={`https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${process.env.REACT_APP_MAP_TILER_API}`}
          />
          <MyMarker />
        </MapContainer>
      )}
    </div>
  );
}

export default App;
