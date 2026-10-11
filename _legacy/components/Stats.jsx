"use client";

import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const stats = [
  { num: 2,  suffix: "+", text: "Années d'expérience",         href: "/resume" },
  { num: 7,  suffix: "+", text: "Projets réalisés",             href: "/work" },
  { num: 15, suffix: "+", text: "Technologies maîtrisées",      href: "/resume#skills" },
  { num: 3,  suffix: "",  text: "Standards OGC · INSPIRE · ISO 19115", href: "/work" },
];

const StatItem = ({ stat, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Link
      href={stat.href}
      ref={ref}
      className="group flex flex-col items-center py-6 xl:py-4 transition-transform duration-200 hover:-translate-y-0.5"
      style={!isLast ? { borderRight: "0.5px solid rgba(255,255,255,0.08)" } : {}}
    >
      <div
        className="font-syne font-black transition-colors duration-200 group-hover:text-accent"
        style={{ fontSize: 28, color: "#ffffff", lineHeight: 1 }}
      >
        {isInView ? (
          <CountUp end={stat.num} suffix={stat.suffix} duration={2} delay={0} />
        ) : (
          <span>0{stat.suffix}</span>
        )}
      </div>
      <p
        className="mt-1.5 text-center font-inter leading-snug"
        style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", maxWidth: 120 }}
      >
        {stat.text}
      </p>
    </Link>
  );
};

const Stats = () => (
  <section style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
    <div className="container mx-auto">
      <div className="grid grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatItem key={index} stat={stat} index={index} isLast={index === stats.length - 1} />
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
