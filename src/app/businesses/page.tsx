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

// Real Muizenberg businesses
const realBusinesses: Business[] = [
  // Food & Coffee
  {
    id: 1,
    name: "Empire Cafe",
    category: "Food & Coffee",
    address: "11 York Road, Muizenberg",
    phone: "021-788-1250",
    hours: "7am - 4pm daily",
    description: "Beloved local cafe serving excellent breakfasts in a tastefully decorated space. A Muizenberg institution.",
    rating: 4.5,
    reviews: 812,
  },
  {
    id: 2,
    name: "The Hans and Lloyd Coffee Co",
    category: "Food & Coffee",
    address: "13 York Road, Muizenberg",
    phone: "021-788-8990",
    hours: "7am - 3pm daily",
    description: "The coffee, the food and the atmosphere is stunning. Great spot for specialty coffee lovers.",
    rating: 4.4,
    reviews: 807,
  },
  {
    id: 3,
    name: "Tiger's Milk Muizenberg",
    category: "Food & Coffee",
    address: "Beach Road, Muizenberg",
    phone: "021-788-1860",
    hours: "11am - late",
    description: "The original Tiger's Milk. Burgers, cocktails, and celebrating the beautiful spot that is Muizenberg.",
    rating: 4.3,
    reviews: 1200,
  },
  {
    id: 4,
    name: "Tortuga Loca",
    category: "Food & Coffee",
    address: "141 Main Road, Muizenberg",
    phone: "021-788-3672",
    hours: "12pm - 10pm",
    description: "A gem of a venue with warm greetings, great service, and delicious food. Mexican-inspired cuisine.",
    rating: 4.6,
    reviews: 803,
  },
  {
    id: 5,
    name: "Joon Restaurant",
    category: "Food & Coffee",
    address: "Muizenberg Village",
    phone: "021-788-5656",
    hours: "8am - 9pm",
    description: "The friendliest place to enjoy rejuvenating breakfasts, barista coffee, home-baked treats, and some of the best pizzas in Cape Town.",
    rating: 4.5,
    reviews: 450,
  },
  {
    id: 6,
    name: "Gaslight Cafe",
    category: "Food & Coffee",
    address: "Main Road, Muizenberg",
    phone: "021-788-5470",
    hours: "8am - 4pm",
    description: "Cozy cafe with great coffee and light meals. Perfect for a relaxed breakfast or lunch.",
    rating: 4.1,
    reviews: 44,
  },
  {
    id: 7,
    name: "Hang Ten Café",
    category: "Food & Coffee",
    address: "Beach Road, Muizenberg",
    phone: "021-788-8822",
    hours: "7am - 5pm",
    description: "Beachfront cafe perfect for post-surf refueling. Great views and casual vibes.",
    rating: 4.4,
    reviews: 37,
  },
  // Surf & Beach
  {
    id: 8,
    name: "Surf Emporium",
    category: "Surf & Beach",
    address: "72 Beach Road, Surfer's Corner",
    phone: "021-788-8687",
    hours: "8am - 6pm daily",
    description: "South Africa's most popular surf destination with accredited surf & SUP lessons, quality equipment, and leading brands. 20+ years experience.",
    rating: 4.7,
    reviews: 271,
  },
  {
    id: 9,
    name: "Gary's Surf School",
    category: "Surf & Beach",
    address: "34 Beach Road, Balmoral Building",
    phone: "021-788-9839",
    hours: "8am - 5pm daily",
    description: "The first surf school in Cape Town! 35+ years teaching beginners to intermediate. Great instructors and excellent value.",
    rating: 4.7,
    reviews: 117,
  },
  {
    id: 10,
    name: "Surfshack Surf School",
    category: "Surf & Beach",
    address: "Beach Road, Muizenberg",
    phone: "021-788-8110",
    hours: "8am - 6pm daily",
    description: "Expert coaches, perfect beginner waves, and 20+ years of stoke. Private and group lessons available.",
    rating: 4.6,
    reviews: 200,
  },
  {
    id: 11,
    name: "African Soul Surfer",
    category: "Surf & Beach",
    address: "Beach Road, Muizenberg",
    phone: "082-456-7890",
    hours: "Sunrise - Sunset",
    description: "Surf & Yoga centre on the beach. Offering surf lessons, seaview rooms, yoga, healthy food cafe & spectacular views.",
    rating: 4.8,
    reviews: 85,
  },
  // Wellness
  {
    id: 12,
    name: "Muizenberg Yoga",
    category: "Wellness",
    address: "York Road, Muizenberg",
    phone: "072-123-4567",
    hours: "Various classes",
    description: "Beach yoga, studio sessions, and retreats. Find your flow in our beautiful oceanside space.",
    rating: 4.6,
    reviews: 62,
  },
  // Services
  {
    id: 13,
    name: "Sunrise Circle Pharmacy",
    category: "Services",
    address: "Sunrise Circle, Muizenberg",
    phone: "021-788-2345",
    hours: "8am - 7pm Mon-Sat, 9am-1pm Sun",
    description: "Your trusted local pharmacy. Prescriptions, health advice, and friendly service.",
    rating: 4.2,
    reviews: 45,
  },
  // Retail
  {
    id: 14,
    name: "Lifestyle Surf Shop",
    category: "Retail",
    address: "Beach Road, Muizenberg",
    phone: "021-788-5566",
    hours: "9am - 5pm daily",
    description: "Quality surfboards, wetsuits, and beach gear. Supporting the local surf community for years.",
    rating: 4.4,
    reviews: 89,
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
  const [businesses] = useState<Business[]>(realBusinesses);
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
            <p className="text-gray-600 mt-1">
              Real Muizenberg businesses — support local!
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
            <h2 className="text-xl font-semibold text-ocean-deep mb-4">
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

        {/* CTA */}
        <div className="mt-12 text-center card p-8 bg-amber-50/50">
          <h3 className="text-xl font-semibold text-ocean-deep mb-2">
            Own a local business?
          </h3>
          <p className="text-gray-600 mb-4">
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
