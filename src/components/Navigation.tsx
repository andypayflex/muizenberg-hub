"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/community", label: "Community", icon: "🏄" },
  { href: "/businesses", label: "Directory", icon: "🏪" },
  { href: "/jobs", label: "Jobs", icon: "💼" },
  { href: "/marketplace", label: "Market", icon: "🛒" },
  { href: "/emergency", label: "Emergency", icon: "🚨" },
];

interface User {
  email: string;
  role: string;
  userId: string;
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setShowUserMenu(false);
    router.refresh();
  };

  return (
    <>
      <div className="hut-stripe" />
      
      <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🏖️</span>
              <span className="font-bold text-xl text-ocean-deep group-hover:text-teal transition-colors">
                Muizenberg Hub
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-xl text-ocean-deep hover:bg-gray-100 transition-all duration-200 flex items-center gap-1.5 font-medium text-sm"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Auth Section */}
              <div className="ml-2 pl-2 border-l border-gray-200">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-medium">
                        {user.email[0].toUpperCase()}
                      </span>
                    </button>
                    
                    {showUserMenu && (
                      <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-800 truncate">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.role === "admin" ? "Admin" : "Member"}</p>
                        </div>
                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowUserMenu(false)}
                          >
                            🔐 Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Log out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/login"
                      className="px-3 py-2 text-sm font-medium text-ocean-deep hover:text-teal transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="btn-primary text-sm py-2"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile Nav */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-1 border-t border-gray-200 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-ocean-deep font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 mt-2 pt-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-sm text-gray-600">
                      Signed in as <span className="font-medium">{user.email}</span>
                    </div>
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="block px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        🔐 Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="block w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-medium"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-4 py-3 rounded-xl bg-teal-600 text-white text-center font-medium mx-4 mt-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
