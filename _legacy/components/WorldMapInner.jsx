"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const PINS = [
  {
    lat: 45.7797, lng: 3.0863,
    city: "Clermont-Ferrand",
    project: "FROST-FORMS · ANR TERRA FORMA",
    color: "#8b5cf6",
  },
  {
    lat: 5.3484, lng: -4.0083,
    city: "Abidjan, Côte d'Ivoire",
    project: "Akili · Gestion scolaire",
    color: "#f59e0b",
  },
  {
    lat: 3.8480, lng: 11.5021,
    city: "Yaoundé, Cameroun",
    project: "Tash-Cash Agency · Freelance",
    color: "#c9982a",
  },
  {
    lat: -4.3276, lng: 15.3136,
    city: "Kinshasa, Congo",
    project: "Wmbia · Plateforme Bible IA",
    color: "#fbbf24",
  },
  {
    lat: 43.6119, lng: 3.8772,
    city: "Montpellier",
    project: "Double Master · IAE + Université",
    color: "#6ee7b7",
  },
];

function Markers() {
  const map = useMap();

  useEffect(() => {
    const markers = PINS.map((pin) => {
      // Custom pulsing circle icon via DivIcon
      const icon = L.divIcon({
        className: "",
        html: `
          <div style="position:relative;width:20px;height:20px;">
            <div style="
              position:absolute;inset:0;
              background:${pin.color};
              border-radius:50%;
              opacity:0.25;
              animation:map-pulse 2s ease-out infinite;
            "></div>
            <div style="
              position:absolute;top:4px;left:4px;
              width:12px;height:12px;
              background:${pin.color};
              border-radius:50%;
              border:2px solid #fff;
            "></div>
          </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([pin.lat, pin.lng], { icon });
      marker.bindPopup(
        `<div style="font-family:sans-serif;min-width:140px;">
          <div style="font-weight:700;font-size:13px;color:#0a0a0a;margin-bottom:4px;">${pin.city}</div>
          <div style="font-size:11px;color:#666;">${pin.project}</div>
        </div>`,
        { maxWidth: 200, className: "map-popup" }
      );
      marker.addTo(map);
      return marker;
    });

    return () => markers.forEach((m) => m.remove());
  }, [map]);

  return null;
}

export default function WorldMapInner() {
  return (
    <>
      <style>{`
        @keyframes map-pulse {
          0%   { transform: scale(1); opacity: 0.35; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .leaflet-container { background: #f7f5f1; }
        .map-popup .leaflet-popup-content-wrapper {
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          border: 0.5px solid #e5e0d8;
        }
        .map-popup .leaflet-popup-tip { background: #fff; }
      `}</style>
      <MapContainer
        center={[15, 10]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Markers />
      </MapContainer>
    </>
  );
}
