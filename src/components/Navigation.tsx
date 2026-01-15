"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/jobs", label: "Jobs", icon: "💼" },
  { href: "/businesses", label: "Directory", icon: "🏪" },
  { href: "/marketplace", label: "Market", icon: "🛒" },
  { href: "/emergency", label: "Emergency", icon: "🚨" },
  { href: "/community", label: "Community", icon: "🏄" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Beach hut stripe accent at top */}
      <div className="hut-stripe" />
      
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-[var(--sand-dark)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🏖️</span>
              <span className="font-bold text-xl text-[var(--ocean-deep)] group-hover:text-[var(--hut-blue)] transition-colors">
                Muizenberg Hub
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-xl text-[var(--ocean-deep)] hover:bg-[var(--sand)] transition-all duration-200 flex items-center gap-2 font-medium"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-[var(--sand)] transition-colors text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile Nav */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-1 border-t border-[var(--sand-dark)] pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 rounded-xl hover:bg-[var(--sand)] transition-colors text-[var(--ocean-deep)] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
