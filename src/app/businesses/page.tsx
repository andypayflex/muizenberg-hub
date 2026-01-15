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
  vibe: string;
}

const categories = [
  { value: "All", icon: "🏪" },
  { value: "Food & Coffee", icon: "☕" },
  { value: "Surf & Beach", icon: "🏄" },
  { value: "Wellness", icon: "🧘" },
  { value: "Retail", icon: "🛍️" },
  { value: "Services", icon: "🔧" },
];

const sampleBusinesses: Business[] = [
  {
    id: 1,
    name: "Café Roux",
    category: "Food & Coffee",
    address: "30 Beach Road",
    phone: "021-788-1234",
    hours: "7am - 4pm daily",
    description: "Legendary Muizenberg café. Great coffee, even better people watching. Right on the beachfront.",
    vibe: "☕ Chill vibes",
  },
  {
    id: 2,
    name: "Gary's Surf School",
    category: "Surf & Beach",
    address: "Surfer's Corner",
    phone: "082-555-1234",
    hours: "Sunrise to sunset",
    description: "Learn to surf with the friendliest instructors in Muiz. All levels welcome.",
    vibe: "🤙 Stoked",
  },
  {
    id: 3,
    name: "Tiger's Milk",
    category: "Food & Coffee",
    address: "Beach Road",
    phone: "021-788-5678",
    hours: "11am - late",
    description: "Burgers, cocktails, and sunset views. Perfect post-surf stop.",
    vibe: "🍔 Good times",
  },
  {
    id: 4,
    name: "Muizenberg Yoga",
    category: "Wellness",
    address: "York Road",
    phone: "072-123-4567",
    hours: "Various classes",
    description: "Beach yoga, studio sessions, and retreats. Find your flow in our beautiful space.",
    vibe: "🧘 Peaceful",
  },
  {
    id: 5,
    name: "Sunrise Pharmacy",
    category: "Services",
    address: "Sunrise Circle",
    phone: "021-788-2345",
    hours: "8am - 7pm Mon-Sat",
    description: "Your local pharmacy. Prescriptions, health advice, and a smile.",
    vibe: "💊 Helpful",
  },
];

const categoryColors: Record<string, string> = {
  "Food & Coffee": "tag-yellow",
  "Surf & Beach": "tag-blue",
  "Wellness": "tag-green",
  "Retail": "tag-ocean",
  "Services": "tag-red",
};

export default function BusinessesPage() {
  const [businesses] = useState<Business[]>(sampleBusinesses);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

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
            <p className="text-[var(--ocean-deep)]/60 mt-1">
              Support our Muizenberg businesses
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            + Add Your Business
          </button>
        </div>

        {/* Add Business Form */}
        {showForm && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold text-[var(--ocean-deep)] mb-4">
              List Your Business
            </h2>
            <form className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Business Name" />
              <select>
                {categories.slice(1).map((cat) => (
                  <option key={cat.value}>{cat.icon} {cat.value}</option>
                ))}
              </select>
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="Phone Number" />
              <input type="text" placeholder="Business Hours" />
              <input type="text" placeholder="Website (optional)" />
              <textarea
                placeholder="Tell the community about your business..."
                className="md:col-span-2"
                rows={3}
              />
              <button type="submit" className="btn-primary md:col-span-2">
                Submit Listing
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
                  ? "bg-[var(--ocean-medium)] text-white shadow-md"
                  : "bg-white text-[var(--ocean-deep)] hover:bg-[var(--sand)] border border-[var(--sand-dark)]"
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.value}
            </button>
          ))}
        </div>

        {/* Business Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((business) => (
            <div key={business.id} className="card p-6">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold text-[var(--ocean-deep)]">
                  {business.name}
                </h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[business.category] || "tag-ocean"}`}>
                  {business.category}
                </span>
              </div>

              <p className="text-[var(--ocean-deep)]/70 mb-4 leading-relaxed">
                {business.description}
              </p>

              <div className="space-y-2 text-sm text-[var(--ocean-deep)]/60 mb-4">
                <p>📍 {business.address}</p>
                <p>📞 {business.phone}</p>
                <p>🕐 {business.hours}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--sand-dark)]">
                <span className="text-sm font-medium text-[var(--hut-blue)]">
                  {business.vibe}
                </span>
                <button className="btn-primary text-sm py-2">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center card p-8 bg-[var(--sand)]/50">
          <h3 className="text-xl font-semibold text-[var(--ocean-deep)] mb-2">
            Own a local business?
          </h3>
          <p className="text-[var(--ocean-deep)]/60 mb-4">
            Get discovered by your neighbours. Free listing for Muizenberg businesses.
          </p>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            Add Your Business
          </button>
        </div>
      </div>
    </div>
  );
}
