"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  userId: string;
  email: string;
  role: string;
}

interface Business {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  approved: number;
}

interface Job {
  id: string;
  title: string;
  company: string;
  type: string;
  approved: number;
}

interface Post {
  id: string;
  type: string;
  title: string;
  author: string;
  approved: number;
}

interface MarketplaceItem {
  id: string;
  title: string;
  price: string;
  seller: string;
  approved: number;
}

type Tab = "businesses" | "jobs" | "posts" | "marketplace";

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("businesses");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [marketplace, setMarketplace] = useState<MarketplaceItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, activeTab]);

  const checkAuth = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    if (!data.user || data.user.role !== "admin") {
      router.push("/admin/login");
    } else {
      setUser(data.user);
    }
    setLoading(false);
  };

  const loadData = async () => {
    const res = await fetch(`/api/admin/${activeTab}`);
    const data = await res.json();
    
    switch (activeTab) {
      case "businesses":
        setBusinesses(data);
        break;
      case "jobs":
        setJobs(data);
        break;
      case "posts":
        setPosts(data);
        break;
      case "marketplace":
        setMarketplace(data);
        break;
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    
    await fetch(`/api/admin/${activeTab}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    
    loadData();
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "businesses", label: "Businesses", icon: "🏪" },
    { id: "jobs", label: "Jobs", icon: "💼" },
    { id: "posts", label: "Posts", icon: "📢" },
    { id: "marketplace", label: "Marketplace", icon: "🛒" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">🔐 Admin Dashboard</h1>
            <a href="/" className="text-sm text-gray-300 hover:text-white">
              ← View Site
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setShowAddForm(false); }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-slate-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {tabs.find((t) => t.id === activeTab)?.icon} Manage{" "}
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary"
          >
            + Add New
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <AddForm
            type={activeTab}
            onSuccess={() => { setShowAddForm(false); loadData(); }}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {activeTab === "businesses" && (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {businesses.map((biz) => (
                  <tr key={biz.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{biz.name}</td>
                    <td className="px-4 py-3 text-gray-600">{biz.category}</td>
                    <td className="px-4 py-3 text-gray-600">{biz.phone}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${biz.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {biz.approved ? "Active" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(biz.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "jobs" && (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Company</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{job.title}</td>
                    <td className="px-4 py-3 text-gray-600">{job.company}</td>
                    <td className="px-4 py-3 text-gray-600">{job.type}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "posts" && (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Author</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{post.title}</td>
                    <td className="px-4 py-3 text-gray-600">{post.type}</td>
                    <td className="px-4 py-3 text-gray-600">{post.author}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "marketplace" && (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Item</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Seller</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {marketplace.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.title}</td>
                    <td className="px-4 py-3 text-gray-600">{item.price}</td>
                    <td className="px-4 py-3 text-gray-600">{item.seller}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// Add Form Component
function AddForm({ type, onSuccess, onCancel }: { type: Tab; onSuccess: () => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`/api/admin/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setLoading(false);
    onSuccess();
  };

  const fields: Record<Tab, { name: string; placeholder: string; required?: boolean }[]> = {
    businesses: [
      { name: "name", placeholder: "Business Name", required: true },
      { name: "category", placeholder: "Category (Food & Coffee, Surf & Beach, etc.)", required: true },
      { name: "address", placeholder: "Address", required: true },
      { name: "phone", placeholder: "Phone", required: true },
      { name: "hours", placeholder: "Hours", required: true },
      { name: "description", placeholder: "Description", required: true },
    ],
    jobs: [
      { name: "title", placeholder: "Job Title", required: true },
      { name: "company", placeholder: "Company", required: true },
      { name: "location", placeholder: "Location", required: true },
      { name: "type", placeholder: "Type (Full-time, Part-time)", required: true },
      { name: "salary", placeholder: "Salary", required: true },
      { name: "description", placeholder: "Description", required: true },
      { name: "contact", placeholder: "Contact", required: true },
    ],
    posts: [
      { name: "type", placeholder: "Type (event, announcement, discussion, alert)", required: true },
      { name: "title", placeholder: "Title", required: true },
      { name: "content", placeholder: "Content", required: true },
      { name: "author", placeholder: "Author", required: true },
    ],
    marketplace: [
      { name: "title", placeholder: "Item Title", required: true },
      { name: "price", placeholder: "Price (e.g., R500)", required: true },
      { name: "category", placeholder: "Category", required: true },
      { name: "condition", placeholder: "Condition", required: true },
      { name: "location", placeholder: "Location", required: true },
      { name: "description", placeholder: "Description", required: true },
      { name: "seller", placeholder: "Seller Name", required: true },
      { name: "contact", placeholder: "Contact", required: true },
    ],
  };

  return (
    <div className="card p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Add New {type.slice(0, -1)}</h3>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        {fields[type].map((field) => (
          <input
            key={field.name}
            type="text"
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
          />
        ))}
        <div className="md:col-span-2 flex gap-2">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
