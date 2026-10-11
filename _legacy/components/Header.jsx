"use client";

import Link from "next/link";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import ModeToggle from "./ModeToggle";
import { motion, useScroll, useTransform } from "framer-motion";

const Header = () => {
  const { scrollY } = useScroll();
  const paddingY = useTransform(scrollY, [0, 80], [28, 14]);

  return (
    <motion.header
      style={{
        paddingTop: paddingY,
        paddingBottom: paddingY,
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "#0a0a0a",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="font-syne font-black text-[28px] tracking-tight text-white">
            Jancy<span style={{ color: "#8b5cf6" }}>.</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-8">
          <ModeToggle />
          <Nav />
          <Link
            href="/contact"
            style={{
              border: "0.5px solid rgba(255,255,255,0.2)",
              borderRadius: "100px",
              color: "#ffffff",
              background: "transparent",
              padding: "8px 20px",
              fontSize: "13px",
              fontWeight: 500,
              transition: "background 0.2s, border-color 0.2s",
            }}
            className="font-inter hover:bg-white/10"
          >
            Me contacter
          </Link>
        </div>

        {/* Mobile */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
