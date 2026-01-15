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
}

const categories = ["All", "Electronics", "Furniture", "Vehicles", "Clothing", "Home & Garden", "Other"];

const sampleItems: Item[] = [
  {
    id: 1,
    title: "Samsung 55\" Smart TV",
    price: "R4,500",
    category: "Electronics",
    condition: "Good",
    location: "Suburb A",
    posted: "2 hours ago",
    seller: "John D.",
    description: "Works perfectly, upgrading to bigger size. Remote included.",
  },
  {
    id: 2,
    title: "3-Seater Leather Couch",
    price: "R2,800",
    category: "Furniture",
    condition: "Fair",
    location: "Suburb B",
    posted: "1 day ago",
    seller: "Mary S.",
    description: "Genuine leather, some wear but still comfortable.",
  },
  {
    id: 3,
    title: "Garden Tools Set",
    price: "R350",
    category: "Home & Garden",
    condition: "Good",
    location: "Suburb A",
    posted: "2 days ago",
    seller: "Peter K.",
    description: "Spade, rake, fork, and trowel. Barely used.",
  },
  {
    id: 4,
    title: "Kids Bicycle",
    price: "R600",
    category: "Other",
    condition: "Excellent",
    location: "Suburb C",
    posted: "3 days ago",
    seller: "Lisa M.",
    description: "Suitable for ages 5-8. Training wheels included.",
  },
];

export default function MarketplacePage() {
  const [items] = useState<Item[]>(sampleItems);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const filtered = filter === "All" 
    ? items 
    : items.filter(i => i.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">🛒 Marketplace</h1>
          <p className="text-gray-600">Buy and sell in your community</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
        >
          + Sell Item
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">List an Item for Sale</h2>
          <form className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Item Title" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none" />
            <input type="text" placeholder="Price (e.g., R500)" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none" />
            <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none">
              {categories.slice(1).map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none">
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
              <option>For Parts</option>
            </select>
            <input type="text" placeholder="Your Location" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none" />
            <input type="text" placeholder="Contact Number" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none" />
            <textarea placeholder="Description" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none md:col-span-2" rows={3} />
            <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors md:col-span-2">
              Post Item
            </button>
          </form>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === cat
                ? "bg-orange-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 h-48 flex items-center justify-center text-6xl">
              📦
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <span className="text-xl font-bold text-orange-600">{item.price}</span>
              </div>
              <div className="mt-2 flex gap-2">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                  {item.category}
                </span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                  {item.condition}
                </span>
              </div>
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">{item.description}</p>
              <div className="mt-3 text-sm text-gray-500">
                <p>📍 {item.location} • 🕐 {item.posted}</p>
                <p>👤 {item.seller}</p>
              </div>
              <button className="mt-3 w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
