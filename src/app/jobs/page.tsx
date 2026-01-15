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
    title: "Cashier",
    company: "Local Grocery Store",
    location: "Main Street",
    type: "Part-time",
    salary: "R80/hour",
    posted: "2 hours ago",
    description: "Looking for a friendly cashier to join our team.",
  },
  {
    id: 2,
    title: "Electrician",
    company: "Spark Electric Services",
    location: "Industrial Area",
    type: "Full-time",
    salary: "R25,000/month",
    posted: "1 day ago",
    description: "Experienced electrician needed for residential and commercial work.",
  },
  {
    id: 3,
    title: "Waitress/Waiter",
    company: "Cafe Corner",
    location: "Shopping Centre",
    type: "Part-time",
    salary: "R70/hour + tips",
    posted: "3 days ago",
    description: "Join our friendly cafe team. Experience preferred.",
  },
];

export default function JobsPage() {
  const [jobs] = useState<Job[]>(sampleJobs);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">💼 Jobs Board</h1>
          <p className="text-gray-600">Find local job opportunities</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          + Post a Job
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
          <form className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Job Title"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              type="text"
              placeholder="Company Name"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              type="text"
              placeholder="Location"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              type="text"
              placeholder="Salary"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Temporary</option>
            </select>
            <input
              type="text"
              placeholder="Contact Number"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <textarea
              placeholder="Job Description"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none md:col-span-2"
              rows={3}
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors md:col-span-2"
            >
              Submit Job Listing
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-blue-600">{job.title}</h2>
                <p className="text-gray-700 font-medium">{job.company}</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {job.type}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
              <span>📍 {job.location}</span>
              <span>💰 {job.salary}</span>
              <span>🕐 {job.posted}</span>
            </div>
            <p className="mt-3 text-gray-600">{job.description}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
