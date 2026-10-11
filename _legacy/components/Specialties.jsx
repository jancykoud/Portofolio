"use client";

import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaLayerGroup, FaWifi, FaBrain } from "react-icons/fa";

const specialties = [
  {
    icon: <FaMapMarkedAlt />,
    title: "SIG & Données environnementales",
    tags: ["OGC SensorThings", "INSPIRE", "ISO 19115", "GeoJSON", "QGIS"],
  },
  {
    icon: <FaLayerGroup />,
    title: "Architecture fullstack",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Prisma"],
  },
  {
    icon: <FaWifi />,
    title: "IoT & Systèmes temps réel",
    tags: ["LoRaWAN", "MQTT", "WebSockets", "Firebase FCM", "Redis"],
  },
  {
    icon: <FaBrain />,
    title: "IA & Recherche vectorielle",
    tags: ["Qdrant", "Embeddings", "Python", "Semantic Search"],
  },
];

const Specialties = () => {
  return (
    <section className="py-12 xl:py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Spécialités</h2>
        <p className="text-white/40 mb-8 text-sm">Domaines d'expertise technique.</p>

        <div
          className="grid grid-cols-1 xl:grid-cols-2"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {specialties.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.08, duration: 0.5 } }}
              className="p-6 flex flex-col gap-4"
              style={{
                borderRight: index % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                borderBottom: index < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl text-accent">{spec.icon}</span>
                <h3 className="text-base font-semibold text-white">{spec.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {spec.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full text-xs"
                    style={{
                      background: "rgba(110,231,183,0.06)",
                      color: "rgba(110,231,183,0.7)",
                      border: "0.5px solid rgba(110,231,183,0.2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialties;
