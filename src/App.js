import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

import backgroundImg from "./images/pattern-bg.png";
import arrowIcon from "./images/icon-arrow.svg";

function App() {
  let ip = "197.210.70.57";
  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [isp, setIsp] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // const position = [51.505, -0.09];
  const position = [9.0764785, 7.398574];

  useEffect(() => {
    fetch("http://ipwho.is/" + ipAddress)
      .then((res) => res.json())
      .then((data) => {
        setIpAddress(data.ip);
      });
  }, []);
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
            <button>
              <img src={arrowIcon}></img>
            </button>
          </div>
          <div className="info">
            <div className="section">
              <h2>IP ADDRESS</h2>
              <p>hello</p>
            </div>
            <div className="bars"></div>
            <div className="section">
              <h2>LOCATION</h2>
              <p>Holslfkb w</p>
            </div>
            <div className="bars"></div>
            <div className="section">
              <h2>TIME ZONE</h2>
              <p>okay!ndigh</p>
            </div>
            <div className="bars"></div>
            <div className="section">
              <h2>ISP</h2>
              <p>Why in the name</p>
            </div>
          </div>
        </div>
      </header>

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100vw", height: "80vh", zIndex: "-20" }}
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
