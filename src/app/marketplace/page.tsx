"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

interface Item {
  id: string;
  title: string;
  price: string;
  category: string;
  condition: string;
  location: string;
  description: string;
  seller: string;
  contact: string;
  emoji: string;
  created_at: string;
}

const categories = [
  { value: "All", icon: "🛒" },
  { value: "Surf Gear", icon: "🏄" },
  { value: "Furniture", icon: "🪑" },
  { value: "Electronics", icon: "📱" },
  { value: "Bikes & Transport", icon: "🚲" },
  { value: "Home & Garden", icon: "🌱" },
  { value: "Other", icon: "📦" },
];

const conditionColors: Record<string, string> = {
  Excellent: "tag-green",
  Good: "tag-blue",
  Fair: "tag-yellow",
  "For Parts": "tag-red",
};

export default function MarketplacePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "", price: "", category: "Surf Gear", condition: "Good",
    location: "Muizenberg", description: "", seller: "", contact: "", emoji: "📦"
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/marketplace");
    const data = await res.json();
    setItems(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch("/api/marketplace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    if (res.ok) {
      setShowForm(false);
      setFormData({
        title: "", price: "", category: "Surf Gear", condition: "Good",
        location: "Muizenberg", description: "", seller: "", contact: "", emoji: "📦"
      });
      fetchItems();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to list item");
    }
    setLoading(false);
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const filtered = filter === "All"
    ? items
    : items.filter((i) => i.category === filter);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">🛒 Marketplace</h1>
            <p className="text-gray-600 mt-1">
              Buy & sell with your Muizenberg neighbours
            </p>
          </div>
          {user ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary"
            >
              + Sell Something
            </button>
          ) : (
            <Link href="/signup" className="btn-primary">
              Sign up to sell
            </Link>
          )}
        </div>

        {/* Sell Form */}
        {showForm && user && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold text-ocean-deep mb-4">
              List an Item
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="What are you selling?"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Price (e.g., R500)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                {categories.slice(1).map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.icon} {cat.value}</option>
                ))}
              </select>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                required
              >
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
                <option>For Parts</option>
              </select>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.seller}
                onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Contact (WhatsApp/Phone)"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
              />
              <textarea
                placeholder="Describe your item..."
                className="md:col-span-2"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <div className="md:col-span-2 flex gap-2">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Posting..." : "Post Item"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filter === cat.value
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.value}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div key={item.id} className="card overflow-hidden">
              {/* Image placeholder with emoji */}
              <div className="h-40 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                <span className="text-6xl">{item.emoji || "📦"}</span>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-ocean-deep leading-tight">
                    {item.title}
                  </h3>
                  <span className="text-lg font-bold text-teal whitespace-nowrap ml-2">
                    {item.price}
                  </span>
                </div>

                <div className="flex gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${conditionColors[item.condition] || "tag-blue"}`}>
                    {item.condition}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="text-xs text-gray-500 mb-4">
                  <p>👤 {item.seller} • 🕐 {formatTime(item.created_at)}</p>
                </div>

                <a href={`tel:${item.contact}`} className="btn-primary w-full text-sm py-2 text-center block">
                  Message Seller
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card p-8 text-center text-gray-500">
            No items listed yet. Got something to sell?
          </div>
        )}

        {/* Tips */}
        <div className="mt-12 card p-6 bg-amber-50/50">
          <h3 className="font-semibold text-ocean-deep mb-2">
            💡 Marketplace Tips
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Meet in public places for exchanges</li>
            <li>• Cash is king in Muiz 💵</li>
            <li>• Check items before paying</li>
            <li>• Be a good neighbour — fair prices, honest descriptions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
