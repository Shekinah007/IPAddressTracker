import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

import backgroundImg from "./images/pattern-bg.png";
import arrowIcon from "./images/icon-arrow.svg";

function App() {
  let ip = "197.210.70.57";
  const [searchBtn, setSearchBtn] = useState(true);
  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [isp, setIsp] = useState("");

  const [latitude, setLatitude] = useState("9.0764785");
  const [longitude, setLongitude] = useState("7.398574");

  // const position = [51.505, -0.09];
  // const position = [9.0764785, 7.398574];
  const position = [latitude, longitude];

  useEffect(() => {
    fetch("http://ipwho.is/" + ipAddress)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIpAddress(data.ip);
        setTimeZone(data.timezone.utc);
        setLocation(data.city + "," + data.region);
        setIsp(data.connection.isp);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
      });
  }, [searchBtn, latitude]);
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
              }}
            />
            <button onClick={() => setSearchBtn((prevState) => !prevState)}>
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

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100vw", height: "80vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
