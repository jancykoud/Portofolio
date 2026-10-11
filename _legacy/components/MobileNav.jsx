"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { useState } from "react";

const links = [
  { name: "Accueil", path: "/" },
  { name: "Projets", path: "/work" },
  { name: "Blog", path: "/blog" },
  { name: "CV", path: "/resume" },
  { name: "Apprentissage", path: "/learning" },
  { name: "Détente", path: "/fun" },
  { name: "Contact", path: "/contact" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[28px] text-primary-dark" />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col"
        style={{ backgroundColor: "#0a0a0a", borderLeft: "0.5px solid rgba(255,255,255,0.08)" }}
      >
        {/* Logo */}
        <div className="mt-24 mb-12 text-center">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <span className="font-syne font-black text-[32px]" style={{ color: "#ffffff" }}>
              Jancy<span style={{ color: "#8b5cf6" }}>.</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-col justify-center items-center gap-6">
          {links.map((link, index) => {
            const isActive = link.path === pathname;
            return (
              <Link
                href={link.path}
                key={index}
                onClick={() => setIsOpen(false)}
                className="text-xl font-inter font-medium transition-colors"
                style={{ color: isActive ? "#8b5cf6" : "rgba(255,255,255,0.6)" }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA mobile */}
        <div className="flex justify-center mt-12">
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            style={{
              border: "0.5px solid rgba(255,255,255,0.2)",
              borderRadius: "100px",
              color: "#ffffff",
              padding: "10px 28px",
              fontSize: "14px",
              fontWeight: 500,
            }}
            className="font-inter"
          >
            Me contacter
          </Link>
        </div>

        {/* Liens sociaux */}
        <div className="flex gap-4 mt-8 justify-center">
          <Link
            href="https://github.com/jancykoud"
            target="_blank"
            onClick={() => setIsOpen(false)}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "0.5px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
          <Link
            href="https://linkedin.com/in/jancy-koud-banga"
            target="_blank"
            onClick={() => setIsOpen(false)}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "0.5px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
