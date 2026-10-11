"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
      className="relative flex justify-center items-center"
    >
      {/* Anneau décoratif violet */}
      <div
        className="absolute"
        style={{
          width: 260,
          height: 260,
          borderRadius: "50%",
          border: "0.5px solid rgba(139,92,246,0.25)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: "0.5px solid rgba(139,92,246,0.12)",
        }}
      />

      {/* Avatar */}
      <div
        className="relative z-10 overflow-hidden"
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          border: "2px solid #e5e0d8",
        }}
      >
        <Image
          src="/kjb.jpg"
          width={180}
          height={180}
          priority
          quality={100}
          alt="Jancy KOUD BANGA"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Badge "Disponible" */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        style={{
          position: "absolute",
          bottom: 8,
          right: -8,
          zIndex: 20,
          background: "#1a1a1a",
          border: "0.5px solid rgba(255,255,255,0.12)",
          borderRadius: 100,
          padding: "4px 10px",
          fontSize: 10,
          fontWeight: 500,
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          gap: 5,
          boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
        }}
        className="font-inter"
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#22c55e",
            display: "inline-block",
            animation: "pulse 2s infinite",
          }}
        />
        Disponible
      </motion.div>
    </motion.div>
  );
};

export default Photo;
