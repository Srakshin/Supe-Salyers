import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Polygon, GeoJSON, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from "../IndianData/UpdateIndiaGeo.json";
import "../styles/IndiaMap.css";

const IndiaMap = () => {
  const [jsonData, setJsonData] = useState({});
  const currentStates = ["Rajasthan", "Tamil Nadu", "Uttar Pradesh","Telangana","Andhra Pradesh"];
  const mapRef = useRef(null); // Create a ref for the map

  useEffect(() => {  
    // Set jsonData when the component mounts
    const jsonData = data;
    setJsonData(jsonData);
    console.log("JSOND: ", jsonData);
    console.log("JSON: ", data);
  }, []);

  // Define a function to handle zoom and load data
  const handleStateClick = async (state, centerCoords) => {
    const stateName = state.properties.ST_NM.split(" ").join("").toLowerCase();
    console.log("Clicked " + stateName);

    const map = mapRef.current;
    if (map) {
      // Fade out the map

      map.getPane("mapPane").style.transition = "opacity 1s ease-in-out";
      map.getPane("mapPane").style.opacity = 0;
      setTimeout(() => {
        // Fly to the new bounds
        map.flyToBounds(centerCoords, { duration: 1 });

        // Restore opacity after the fly animation
        setTimeout(() => {
          map.getPane("mapPane").style.opacity = 1;
          map.getPane("mapPane").style.transition = "none";
        }, 1500);
      }, 200);
    }
    setTimeout(() => {
      window.location.href = `/state/${stateName}`;
    }, 1200);
  };

  return (
    <div>
      <MapContainer
        ref={mapRef}
        center={[22.5, 80]}
        zoom={4.5}
        style={{ height: "100vh", width: "100vw" }}
        scrollWheelZoom={false}
      >
        {/* <GeoJSON
          data={data}
          onEachFeature={(feature, layer) => {
            const stateName = feature.properties.ST_NM;

            // Define custom styles for the default and hovered states
            const defaultStyle = {
              fillColor: currentStates.includes(stateName) ? "green" : "red",
              color: "white",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.7,
            };

            const hoverStyle = {
              color: "white",
              weight: 2,
              opacity: 1,
              fillOpacity: 0.9,
            };

            layer.setStyle(defaultStyle);

            layer.on("click", () => {
              const bounds = layer.getBounds();
              handleStateClick(feature, bounds);
            });

            layer.bindTooltip(stateName, {
              permanent: false,
              direction: "center",
              opacity: 0.7,
            });

            layer.on("mouseover", () => {
              layer.setStyle(hoverStyle);
            });

            layer.on("mouseout", () => {
              layer.setStyle(defaultStyle);
            });
          }}
        /> */}
        <GeoJSON
  data={data}
  onEachFeature={(feature, layer) => {
    const stateName = feature.properties.ST_NM;

    // Define custom styles for the default and hovered states
    const defaultStyle = {
      fillColor: currentStates.includes(stateName) ? "green" : "red",
      color: "white",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7,
    };

    const hoverStyle = {
      color: "white",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
    };

    layer.setStyle(defaultStyle);

    layer.on("click", () => {
      const bounds = layer.getBounds();
      handleStateClick(feature, bounds);
    });

    layer.bindTooltip(stateName, {
      permanent: false,
      direction: "center",
      opacity: 0.7,
    });

    layer.on("mouseover", () => {
      layer.setStyle(hoverStyle);
      // Set custom cursor image when hovering over the feature
      layer._map.getContainer().style.cursor = 'url(path/to/your/custom-cursor.png), auto';
    });

    layer.on("mouseout", () => {
      layer.setStyle(defaultStyle);
      // Reset the cursor to default
      layer._map.getContainer().style.cursor = ''; // Reset to default cursor
    });
  }}
/>

      </MapContainer>
       <div
        // style={{
        //   position: "absolute",
        //   width: "210px",
        //   height: "fit-content",
        //   top: "20px",
        //   right: "20px",
        //   background: "#bbcce4",
        //   padding: "5px 15px",
        //   paddingTop: "-10px",
        //   borderRadius: "25px",
        //   // opacity: "0.5",
        // }}
        style={{
          position: "absolute",
          width: "210px",
          height: "fit-content",
          top: "20px",
          right: "20px",
          background: "#ADD8E6",
          padding: "5px 15px",
          borderRadius: "25px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow effect
        }}
      > 
        <h4
          style={{
            paddingBottom: "5px",
            marginTop: "10px",
          }}
        >
          Working States
        </h4>
        {/* <br /> */}
        <p>Rajasthan</p>
        <p>Uttar Pradesh</p>
        <p>Tamil Nadu</p>
        <p>Telangana</p>
        <p>Andhra Pradesh</p>
      </div>
    </div>
  );
};

export default IndiaMap;

