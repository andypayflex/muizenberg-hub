"use client";

import { useState } from "react";

interface Item {
  id: number;
  title: string;
  price: string;
  category: string;
  condition: string;
  location: string;
  posted: string;
  seller: string;
  description: string;
  emoji: string;
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

const sampleItems: Item[] = [
  {
    id: 1,
    title: "7'2 Mini Mal Surfboard",
    price: "R2,500",
    category: "Surf Gear",
    condition: "Good",
    location: "Muizenberg",
    posted: "3 hours ago",
    seller: "Mike S.",
    description: "Great beginner board. Few dings but rides well. Includes fins.",
    emoji: "🏄",
  },
  {
    id: 2,
    title: "Beach Cruiser Bicycle",
    price: "R1,800",
    category: "Bikes & Transport",
    condition: "Excellent",
    location: "Muizenberg",
    posted: "1 day ago",
    seller: "Sarah L.",
    description: "Perfect for riding along the beachfront. Recently serviced.",
    emoji: "🚲",
  },
  {
    id: 3,
    title: "Vintage Rattan Chair",
    price: "R650",
    category: "Furniture",
    condition: "Good",
    location: "Muizenberg",
    posted: "2 days ago",
    seller: "Emma K.",
    description: "Beautiful bohemian piece. Great for a balcony or sunroom.",
    emoji: "🪑",
  },
  {
    id: 4,
    title: "Wetsuit 3/2mm (Medium)",
    price: "R800",
    category: "Surf Gear",
    condition: "Fair",
    location: "Muizenberg",
    posted: "4 days ago",
    seller: "Tom R.",
    description: "O'Neill wetsuit, good for summer. Some wear but no holes.",
    emoji: "🤿",
  },
  {
    id: 5,
    title: "Succulent Collection",
    price: "R150",
    category: "Home & Garden",
    condition: "Excellent",
    location: "Muizenberg",
    posted: "5 days ago",
    seller: "Lisa M.",
    description: "6 potted succulents. Perfect for sunny Muiz gardens!",
    emoji: "🌵",
  },
];

const conditionColors: Record<string, string> = {
  Excellent: "tag-green",
  Good: "tag-blue",
  Fair: "tag-yellow",
  "For Parts": "tag-red",
};

export default function MarketplacePage() {
  const [items] = useState<Item[]>(sampleItems);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

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
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            + Sell Something
          </button>
        </div>

        {/* Sell Form */}
        {showForm && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold text-ocean-deep mb-4">
              List an Item
            </h2>
            <form className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="What are you selling?" />
              <input type="text" placeholder="Price (e.g., R500)" />
              <select>
                {categories.slice(1).map((cat) => (
                  <option key={cat.value}>{cat.icon} {cat.value}</option>
                ))}
              </select>
              <select>
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
                <option>For Parts</option>
              </select>
              <input type="text" placeholder="Your Name" />
              <input type="text" placeholder="Contact (WhatsApp/Phone)" />
              <textarea
                placeholder="Describe your item..."
                className="md:col-span-2"
                rows={3}
              />
              <button type="submit" className="btn-primary md:col-span-2">
                Post Item
              </button>
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
                <span className="text-6xl">{item.emoji}</span>
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
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${conditionColors[item.condition]}`}>
                    {item.condition}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="text-xs text-gray-500 mb-4">
                  <p>👤 {item.seller} • 🕐 {item.posted}</p>
                </div>

                <button className="btn-primary w-full text-sm py-2">
                  Message Seller
                </button>
              </div>
            </div>
          ))}
        </div>

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
