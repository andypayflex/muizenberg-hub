"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  contact: string;
  created_at: string;
}

const typeColors: Record<string, string> = {
  "Part-time": "tag-blue",
  "Full-time": "tag-green",
  "Seasonal": "tag-yellow",
  "Contract": "tag-ocean",
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "", company: "", location: "", type: "Part-time", salary: "", description: "", contact: ""
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    if (res.ok) {
      setShowForm(false);
      setFormData({ title: "", company: "", location: "", type: "Part-time", salary: "", description: "", contact: "" });
      fetchJobs();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to post job");
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

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">💼 Jobs Board</h1>
            <p className="text-gray-600 mt-1">
              Work local, live local in Muizenberg
            </p>
          </div>
          {user ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary"
            >
              + Post a Job
            </button>
          ) : (
            <Link href="/signup" className="btn-primary">
              Sign up to post
            </Link>
          )}
        </div>

        {/* Post Form */}
        {showForm && user && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold text-ocean-deep mb-4">
              Post a New Job
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Company/Business Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Location in Muizenberg"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Salary/Rate"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                required
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Seasonal</option>
                <option>Contract</option>
              </select>
              <input
                type="text"
                placeholder="Contact (phone/email)"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
              />
              <textarea
                placeholder="Job Description - what makes this role great?"
                className="md:col-span-2"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <div className="md:col-span-2 flex gap-2">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Posting..." : "Post Job"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="card p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-ocean-deep">
                    {job.title}
                  </h2>
                  <p className="text-teal font-medium">{job.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[job.type] || "tag-ocean"}`}>
                  {job.type}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                <span>📍 {job.location}</span>
                <span>💰 {job.salary}</span>
                <span>🕐 {formatTime(job.created_at)}</span>
              </div>
              
              <p className="mt-4 text-gray-700 leading-relaxed">
                {job.description}
              </p>
              
              <div className="mt-4 flex gap-3">
                <a href={`tel:${job.contact}`} className="btn-primary text-sm py-2">
                  Get in Touch
                </a>
                <button className="btn-secondary text-sm py-2">
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="card p-8 text-center text-gray-500">
            No jobs posted yet. Know of an opening? Post it above!
          </div>
        )}

        {/* Empty state hint */}
        <div className="mt-8 text-center text-gray-500">
          <p>Know of a job opening? Help your community — post it above! 🤙</p>
        </div>
      </div>
    </div>
  );
}
