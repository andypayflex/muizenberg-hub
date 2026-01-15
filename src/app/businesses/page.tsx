"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

interface Business {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  rating?: number;
  reviews?: number;
}

const categories = [
  { value: "All", icon: "🏪" },
  { value: "Food & Coffee", icon: "☕" },
  { value: "Surf & Beach", icon: "🏄" },
  { value: "Wellness", icon: "🧘" },
  { value: "Retail", icon: "🛍️" },
  { value: "Services", icon: "🔧" },
];

const categoryColors: Record<string, string> = {
  "Food & Coffee": "tag-yellow",
  "Surf & Beach": "tag-blue",
  "Wellness": "tag-green",
  "Retail": "tag-ocean",
  "Services": "tag-red",
};

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "", category: "Food & Coffee", address: "", phone: "", hours: "", description: ""
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    const res = await fetch("/api/businesses");
    const data = await res.json();
    setBusinesses(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch("/api/businesses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    if (res.ok) {
      setShowForm(false);
      setFormData({ name: "", category: "Food & Coffee", address: "", phone: "", hours: "", description: "" });
      fetchBusinesses();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to add business");
    }
    setLoading(false);
  };

  const filtered = filter === "All"
    ? businesses
    : businesses.filter((b) => b.category === filter);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">🏪 Local Directory</h1>
            <p className="text-gray-600 mt-1">
              Real Muizenberg businesses — support local!
            </p>
          </div>
          {user ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary"
            >
              + Add Your Business
            </button>
          ) : (
            <Link href="/signup" className="btn-primary">
              Sign up to add
            </Link>
          )}
        </div>

        {/* Add Business Form */}
        {showForm && user && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold text-ocean-deep mb-4">
              List Your Business
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Business Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Business Hours"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                required
              />
              <input type="text" placeholder="Website (optional)" />
              <textarea
                placeholder="Tell the community about your business..."
                className="md:col-span-2"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <div className="md:col-span-2 flex gap-2">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Submitting..." : "Submit Listing"}
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
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.value}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing {filtered.length} {filter === "All" ? "businesses" : filter.toLowerCase()}
        </p>

        {/* Business Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((business) => (
            <div key={business.id} className="card p-6">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold text-ocean-deep">
                  {business.name}
                </h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[business.category] || "tag-ocean"}`}>
                  {business.category}
                </span>
              </div>

              {business.rating && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium ml-1">{business.rating}</span>
                  </div>
                  {business.reviews && (
                    <span className="text-gray-500 text-sm">
                      ({business.reviews} reviews)
                    </span>
                  )}
                </div>
              )}

              <p className="text-gray-600 mb-4 leading-relaxed">
                {business.description}
              </p>

              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <p>📍 {business.address}</p>
                <p>📞 {business.phone}</p>
                <p>🕐 {business.hours}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <a 
                  href={`tel:${business.phone.replace(/[^0-9]/g, '')}`}
                  className="btn-primary text-sm py-2 flex-1 text-center"
                >
                  📞 Call
                </a>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(business.name + ' Muizenberg')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm py-2 flex-1 text-center"
                >
                  📍 Map
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card p-8 text-center text-gray-500">
            No businesses found in this category.
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center card p-8 bg-amber-50/50">
          <h3 className="text-xl font-semibold text-ocean-deep mb-2">
            Own a local business?
          </h3>
          <p className="text-gray-600 mb-4">
            Get discovered by your neighbours. Free listing for Muizenberg businesses.
          </p>
          {user ? (
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Add Your Business
            </button>
          ) : (
            <Link href="/signup" className="btn-primary">
              Sign up to add your business
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
