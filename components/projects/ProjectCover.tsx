import Image from "next/image";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";
import { BrowserBar, PhoneFrame } from "./DeviceFrame";

function Motif({ motif, hue }: { motif: Project["cover"]["motif"]; hue: string }) {
  const stroke = { stroke: hue, strokeOpacity: 0.55, strokeWidth: 0.6, fill: "none" } as const;
  switch (motif) {
    case "grid":
      return (
        <g>
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} x1={20 + i * 20} y1="0" x2={20 + i * 20} y2="120" {...stroke} strokeOpacity={0.18} />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={20 + i * 20} x2="200" y2={20 + i * 20} {...stroke} strokeOpacity={0.18} />
          ))}
          <rect x="120" y="20" width="60" height="40" {...stroke} />
          <rect x="140" y="60" width="40" height="40" fill={hue} fillOpacity="0.25" />
        </g>
      );
    case "orbit":
      return (
        <g>
          {[18, 32, 46, 60].map((r) => (
            <circle key={r} cx="150" cy="60" r={r} {...stroke} strokeOpacity={0.12 + r / 200} />
          ))}
          <circle cx="150" cy="60" r="8" fill={hue} />
          <circle cx="196" cy="42" r="3" fill={hue} />
          <circle cx="118" cy="88" r="2.5" fill={hue} fillOpacity="0.7" />
        </g>
      );
    case "wave":
      return (
        <g>
          {Array.from({ length: 7 }, (_, i) => (
            <path key={i} d={`M0 ${40 + i * 10} C 50 ${20 + i * 10}, 100 ${70 + i * 10}, 200 ${30 + i * 12}`} {...stroke} strokeOpacity={0.15 + i * 0.08} />
          ))}
        </g>
      );
    case "stack":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={110 + i * 12} y={18 + i * 14} width="70" height="46" rx="6" {...stroke} fill="var(--surface)" strokeOpacity={0.3 + i * 0.25} />
          ))}
          <rect x="146" y="58" width="22" height="4" rx="2" fill={hue} />
        </g>
      );
    case "nodes":
    default: {
      const pts = [
        [110, 30], [150, 22], [186, 48], [130, 70], [170, 92], [104, 98],
      ] as const;
      return (
        <g>
          {pts.map(([x, y], i) =>
            pts.slice(i + 1).map(([x2, y2], j) =>
              (i + j) % 2 === 0 ? <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} {...stroke} strokeOpacity={0.25} /> : null,
            ),
          )}
          {pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 2 ? 5 : 3} fill={i === 2 ? hue : "var(--fg)"} fillOpacity={i === 2 ? 1 : 0.7} />
          ))}
        </g>
      );
    }
  }
}

/**
 * Project visual. Uses the first real screenshot when available; otherwise a
 * typographic identity cover — never a fabricated interface.
 */
export function ProjectCover({
  project,
  className,
  priority,
  sizes = "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw",
  compact,
}: {
  project: Project;
  compact?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const shot = project.screens[0];
  return (
    <div className={cn("relative overflow-hidden bg-surface-2", className)}>
      {shot && shot.device === "mobile" ? (
        <div className="tech-grid absolute inset-0 flex items-center justify-center py-[5%]">
          <PhoneFrame className="h-full transition-transform duration-700 ease-out-expo group-hover:-translate-y-1">
            <Image src={shot.src} alt={shot.alt} fill priority={priority} sizes="240px" className="object-cover object-top" />
          </PhoneFrame>
        </div>
      ) : shot ? (
        <div className="absolute inset-0 flex flex-col">
          {!compact && <BrowserBar size="sm" />}
          <div className="relative flex-1 overflow-hidden">
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              priority={priority}
              sizes={sizes}
              className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.035]"
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(80% 90% at 85% 15%, color-mix(in srgb, ${project.cover.hue} 22%, transparent), transparent 70%)` }}
          />
          <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
            <Motif motif={project.cover.motif} hue={project.cover.hue} />
          </svg>
          {!compact && (
            <span className="absolute bottom-[8%] left-[6%] text-[clamp(1.6rem,5vw,3.2rem)] leading-none font-semibold tracking-[-0.05em] text-fg/90">
              {project.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
