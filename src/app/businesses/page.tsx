"use client";

import { useState } from "react";

interface Business {
  id: number;
  name: string;
  category: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  rating: number;
}

const categories = ["All", "Food & Dining", "Retail", "Services", "Health", "Auto", "Other"];

const sampleBusinesses: Business[] = [
  {
    id: 1,
    name: "Joe's Auto Repair",
    category: "Auto",
    address: "45 Industrial Road",
    phone: "011-123-4567",
    hours: "Mon-Fri 8am-5pm",
    description: "Quality auto repairs and servicing. All makes and models.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Fresh Bakery",
    category: "Food & Dining",
    address: "12 Main Street",
    phone: "011-234-5678",
    hours: "Daily 6am-6pm",
    description: "Fresh bread, pastries, and cakes baked daily.",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Community Pharmacy",
    category: "Health",
    address: "78 Centre Ave",
    phone: "011-345-6789",
    hours: "Mon-Sat 8am-8pm, Sun 9am-1pm",
    description: "Your trusted local pharmacy. Prescriptions and health advice.",
    rating: 4.2,
  },
  {
    id: 4,
    name: "Quick Print",
    category: "Services",
    address: "23 Business Park",
    phone: "011-456-7890",
    hours: "Mon-Fri 8am-5pm",
    description: "Printing, copying, binding, and design services.",
    rating: 4.0,
  },
];

export default function BusinessesPage() {
  const [businesses] = useState<Business[]>(sampleBusinesses);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const filtered = filter === "All" 
    ? businesses 
    : businesses.filter(b => b.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">🏪 Business Directory</h1>
          <p className="text-gray-600">Discover local businesses and services</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          + Add Business
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Register Your Business</h2>
          <form className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Business Name" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
            <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none">
              {categories.slice(1).map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <input type="text" placeholder="Address" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
            <input type="text" placeholder="Phone Number" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
            <input type="text" placeholder="Business Hours" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
            <input type="text" placeholder="Website (optional)" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
            <textarea placeholder="Description" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none md:col-span-2" rows={3} />
            <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors md:col-span-2">
              Submit Business
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
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((business) => (
          <div key={business.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-purple-600">{business.name}</h2>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {business.category}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1">
              {"⭐".repeat(Math.floor(business.rating))}
              <span className="text-gray-600 text-sm ml-1">{business.rating}</span>
            </div>
            <p className="mt-3 text-gray-600">{business.description}</p>
            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p>📍 {business.address}</p>
              <p>📞 {business.phone}</p>
              <p>🕐 {business.hours}</p>
            </div>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
