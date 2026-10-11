"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BsGithub, BsStar } from "react-icons/bs";
import { FaCodeBranch } from "react-icons/fa";

// Couleurs associées aux langages
const LANG_COLORS = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572a5",
  "Vue": "#42b883",
  "Svelte": "#ff3e00",
  "CSS": "#563d7c",
  "HTML": "#e34c26",
  Shell: "#89e051",
  Go: "#00add8",
  Rust: "#dea584",
  Java: "#b07219",
  default: "#8b5cf6",
};

// Skeleton loader
const Skeleton = () => (
  <div className="animate-pulse flex flex-col gap-4 p-5 h-full">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-white/10" />
      <div className="h-4 bg-white/10 rounded w-28" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-12 bg-white/10 rounded-lg" />
      ))}
    </div>
    <div className="space-y-2 mt-auto">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-2 bg-white/10 rounded-full w-14" />
          <div className="h-2 bg-white/10 rounded-full flex-1" />
        </div>
      ))}
    </div>
  </div>
);

const GitHubCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(true);
        else setData(d);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 p-5">
        <BsGithub className="text-4xl text-white/30" />
        <p className="text-white/40 text-xs font-inter text-center">
          Stats GitHub indisponibles
        </p>
        <Link
          href="https://github.com/jancykoud"
          target="_blank"
          className="text-xs font-inter text-white/50 hover:text-white transition-colors underline"
        >
          Voir le profil →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-5 gap-4 font-inter">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BsGithub className="text-xl text-white" />
          <span className="text-white font-medium text-sm">GitHub Live</span>
        </div>
        <Link
          href={data.profileUrl}
          target="_blank"
          className="text-[10px] text-white/40 hover:text-white transition-colors"
        >
          @{data.username} ↗
        </Link>
      </div>

      {/* Métriques */}
      <div className="grid grid-cols-2 gap-2">
        <div
          className="rounded-lg p-3"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-[10px] text-white/40 mb-1">Repos publics</p>
          <p className="text-xl font-bold text-white font-syne">
            {data.publicRepos}
          </p>
        </div>
        <div
          className="rounded-lg p-3"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-1 text-[10px] text-white/40 mb-1">
            <BsStar className="text-[10px]" />
            <span>Stars totales</span>
          </div>
          <p className="text-xl font-bold text-white font-syne">
            {data.totalStars}
          </p>
        </div>
        {data.contributions !== null && (
          <div
            className="col-span-2 rounded-lg p-3"
            style={{ background: "rgba(139,92,246,0.12)" }}
          >
            <div className="flex items-center gap-1 text-[10px] mb-1"
                 style={{ color: "#c4b5fd" }}>
              <FaCodeBranch className="text-[10px]" />
              <span>Contributions cette année</span>
            </div>
            <p className="text-xl font-bold font-syne" style={{ color: "#a78bfa" }}>
              {data.contributions}
            </p>
          </div>
        )}
      </div>

      {/* Top langages */}
      {data.topLanguages?.length > 0 && (
        <div className="mt-auto space-y-2">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">
            Top langages
          </p>
          {data.topLanguages.map(({ lang, percentage }) => {
            const color = LANG_COLORS[lang] || LANG_COLORS.default;
            return (
              <div key={lang} className="flex items-center gap-2">
                <span
                  className="text-[10px] w-20 text-white/60 shrink-0 truncate"
                >
                  {lang}
                </span>
                <div
                  className="flex-1 rounded-full overflow-hidden"
                  style={{ height: 4, background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    style={{
                      width: `${percentage}%`,
                      height: "100%",
                      background: color,
                      borderRadius: "9999px",
                      transition: "width 0.8s ease",
                    }}
                  />
                </div>
                <span className="text-[10px] text-white/30 w-8 text-right">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GitHubCard;
