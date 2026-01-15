"use client";

import { useState } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
}

const sampleJobs: Job[] = [
  {
    id: 1,
    title: "Barista",
    company: "Café Roux",
    location: "Beach Road",
    type: "Part-time",
    salary: "R90/hour",
    posted: "2 hours ago",
    description: "Join our beachfront café team. Coffee experience preferred, good vibes essential.",
  },
  {
    id: 2,
    title: "Surf Instructor",
    company: "Muizenberg Surf School",
    location: "Surfer's Corner",
    type: "Seasonal",
    salary: "R200/lesson",
    posted: "1 day ago",
    description: "Teach beginners the joy of surfing. Must have Level 1 coaching cert and love for the ocean.",
  },
  {
    id: 3,
    title: "Shop Assistant",
    company: "Sunrise Circle Pharmacy",
    location: "Main Road",
    type: "Full-time",
    salary: "R8,500/month",
    posted: "3 days ago",
    description: "Friendly person needed for customer service and stock management.",
  },
  {
    id: 4,
    title: "Yoga Teacher",
    company: "Beach Yoga Muizenberg",
    location: "Beachfront",
    type: "Part-time",
    salary: "Per class",
    posted: "5 days ago",
    description: "Morning beach yoga sessions. 200hr YTT minimum. Join our peaceful community.",
  },
];

const typeColors: Record<string, string> = {
  "Part-time": "tag-blue",
  "Full-time": "tag-green",
  "Seasonal": "tag-yellow",
  "Contract": "tag-ocean",
};

export default function JobsPage() {
  const [jobs] = useState<Job[]>(sampleJobs);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">💼 Jobs Board</h1>
            <p className="text-[var(--ocean-deep)]/60 mt-1">
              Work local, live local in Muizenberg
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            + Post a Job
          </button>
        </div>

        {/* Post Form */}
        {showForm && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold text-[var(--ocean-deep)] mb-4">
              Post a New Job
            </h2>
            <form className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Job Title" />
              <input type="text" placeholder="Company/Business Name" />
              <input type="text" placeholder="Location in Muizenberg" />
              <input type="text" placeholder="Salary/Rate" />
              <select>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Seasonal</option>
                <option>Contract</option>
              </select>
              <input type="text" placeholder="Contact (phone/email)" />
              <textarea
                placeholder="Job Description - what makes this role great?"
                className="md:col-span-2"
                rows={3}
              />
              <button type="submit" className="btn-primary md:col-span-2">
                Post Job
              </button>
            </form>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="card p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-[var(--ocean-deep)]">
                    {job.title}
                  </h2>
                  <p className="text-[var(--hut-blue)] font-medium">{job.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[job.type] || "tag-ocean"}`}>
                  {job.type}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-[var(--ocean-deep)]/60">
                <span>📍 {job.location}</span>
                <span>💰 {job.salary}</span>
                <span>🕐 {job.posted}</span>
              </div>
              
              <p className="mt-4 text-[var(--ocean-deep)]/80 leading-relaxed">
                {job.description}
              </p>
              
              <div className="mt-4 flex gap-3">
                <button className="btn-primary text-sm py-2">
                  Get in Touch
                </button>
                <button className="btn-secondary text-sm py-2">
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state hint */}
        <div className="mt-8 text-center text-[var(--ocean-deep)]/50">
          <p>Know of a job opening? Help your community — post it above! 🤙</p>
        </div>
      </div>
    </div>
  );
}
