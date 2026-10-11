"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function cssColor(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(v || fallback);
}

/** Fibonacci-distributed points on a sphere: an abstract "data globe". */
function spherePoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions.set([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius], i * 3);
    seeds[i] = Math.random();
  }
  return { positions, seeds };
}

const vertex = /* glsl */ `
  attribute float seed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying float vSeed;
  void main() {
    vec3 p = position;
    float pulse = sin(uTime * 0.6 + seed * 6.2831) * 0.035;
    p *= 1.0 + pulse * step(0.86, seed);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float facing = clamp((-mv.z - 2.2) / 2.4, 0.0, 1.0);
    vAlpha = mix(0.95, 0.18, facing);
    vSeed = seed;
    gl_PointSize = (seed > 0.94 ? 6.0 : 3.4) * uPixelRatio * (3.4 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vAlpha;
  varying float vSeed;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 col = vSeed > 0.94 ? uColorB : uColorA;
    gl_FragColor = vec4(col, vAlpha * smoothstep(0.5, 0.15, d));
  }
`;

export default function HeroScene({ count = 2600 }: { count?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(pixelRatio);
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 5.2);

    const group = new THREE.Group();
    group.rotation.set(0.35, 0, -0.18);
    scene.add(group);

    const uniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uColorA: { value: cssColor("--atmo-1", "#2563eb") },
      uColorB: { value: cssColor("--accent-fg", "#b9ff66") },
    };

    const { positions, seeds } = spherePoints(count, 1.55);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(geometry, material));

    // Two orbital rings: a nod to data flowing between systems.
    const ringMaterial = new THREE.LineBasicMaterial({ color: uniforms.uColorA.value, transparent: true, opacity: 0.35 });
    const rings: THREE.LineLoop[] = [];
    for (const [r, tilt] of [
      [2.05, 1.15],
      [2.4, -0.55],
    ] as const) {
      const pts = Array.from({ length: 160 }, (_, i) => {
        const a = (i / 160) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r);
      });
      const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), ringMaterial);
      ring.rotation.x = tilt;
      group.add(ring);
      rings.push(ring);
    }

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onTheme = () => {
      uniforms.uColorA.value = cssColor("--atmo-1", "#2563eb");
      uniforms.uColorB.value = cssColor("--accent-fg", "#b9ff66");
      ringMaterial.color = uniforms.uColorA.value;
      material.blending = document.documentElement.dataset.scheme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending;
      material.needsUpdate = true;
    };
    onTheme();
    window.addEventListener("koud:prefs", onTheme);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
    });
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;
      group.rotation.y = t * 0.06;
      rings[0]!.rotation.z = t * 0.05;
      rings[1]!.rotation.z = -t * 0.035;
      group.position.x += (pointer.x * 0.12 - group.position.x) * 0.04;
      group.position.y += (-pointer.y * 0.08 - group.position.y) * 0.04;
      renderer.render(scene, camera);
    };
    tick();
    mount.dataset.ready = "true";

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("koud:prefs", onTheme);
      geometry.dispose();
      material.dispose();
      ringMaterial.dispose();
      rings.forEach((r) => r.geometry.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [count]);

  return <div ref={mountRef} className="absolute inset-0 transition-opacity duration-1000 data-[ready=true]:opacity-100 opacity-0" />;
}
