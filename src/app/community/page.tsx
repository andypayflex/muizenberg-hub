"use client";

import { useState } from "react";

interface Post {
  id: number;
  type: "announcement" | "event" | "discussion" | "alert";
  title: string;
  content: string;
  author: string;
  posted: string;
  likes: number;
  comments: number;
}

const postTypes = [
  { value: "all", label: "All Posts", icon: "📋" },
  { value: "announcement", label: "Announcements", icon: "📢" },
  { value: "event", label: "Events", icon: "📅" },
  { value: "discussion", label: "Discussions", icon: "💬" },
  { value: "alert", label: "Alerts", icon: "⚠️" },
];

const samplePosts: Post[] = [
  {
    id: 1,
    type: "event",
    title: "Community Meeting - Saturday 10am",
    content: "Join us at the community hall this Saturday at 10am to discuss upcoming improvements to the local park. Refreshments will be provided. All residents welcome!",
    author: "Community Committee",
    posted: "1 day ago",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    type: "alert",
    title: "Load Shedding Schedule Change",
    content: "Please note that our area has been moved to Stage 4 load shedding group. Check the updated schedule. Remember to charge devices and have candles ready.",
    author: "Admin",
    posted: "3 hours ago",
    likes: 45,
    comments: 12,
  },
  {
    id: 3,
    type: "announcement",
    title: "New Recycling Program Starting",
    content: "Starting next month, we will have weekly recycling collection every Wednesday. Separate your paper, plastic, and glass. Collection bags will be distributed this week.",
    author: "Municipality",
    posted: "2 days ago",
    likes: 67,
    comments: 15,
  },
  {
    id: 4,
    type: "discussion",
    title: "Anyone know a good plumber?",
    content: "Looking for recommendations for a reliable plumber in the area. Have a leaky tap that needs fixing. Reasonable rates preferred. Thanks in advance!",
    author: "Sarah M.",
    posted: "5 hours ago",
    likes: 3,
    comments: 7,
  },
  {
    id: 5,
    type: "event",
    title: "Street Clean-up Day - 25th January",
    content: "Let's keep our community clean! Join us for a neighborhood clean-up on the 25th. Meet at the park entrance at 8am. Gloves and bags provided. Bring the family!",
    author: "Green Team",
    posted: "1 day ago",
    likes: 32,
    comments: 5,
  },
  {
    id: 6,
    type: "alert",
    title: "Suspicious Activity Reported",
    content: "There have been reports of suspicious individuals checking cars on Oak Street last night. Please ensure vehicles are locked and valuables are not visible. Report any suspicious activity to community watch.",
    author: "Neighborhood Watch",
    posted: "12 hours ago",
    likes: 89,
    comments: 23,
  },
];

const typeStyles = {
  announcement: { bg: "bg-blue-100", text: "text-blue-800", icon: "📢" },
  event: { bg: "bg-green-100", text: "text-green-800", icon: "📅" },
  discussion: { bg: "bg-purple-100", text: "text-purple-800", icon: "💬" },
  alert: { bg: "bg-red-100", text: "text-red-800", icon: "⚠️" },
};

export default function CommunityPage() {
  const [posts] = useState<Post[]>(samplePosts);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filtered = filter === "all" 
    ? posts 
    : posts.filter(p => p.type === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">📢 Community Posts</h1>
          <p className="text-gray-600">News, events, and discussions</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + New Post
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
          <form className="space-y-4">
            <div className="flex gap-4">
              <select className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="discussion">💬 Discussion</option>
                <option value="event">📅 Event</option>
                <option value="announcement">📢 Announcement</option>
                <option value="alert">⚠️ Alert</option>
              </select>
              <input
                type="text"
                placeholder="Your Name"
                className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Post Title"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              placeholder="What would you like to share with the community?"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={4}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post to Community
            </button>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {postTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setFilter(type.value)}
            className={`px-4 py-2 rounded-full transition-colors flex items-center gap-1 ${
              filter === type.value
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <span>{type.icon}</span>
            <span>{type.label}</span>
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filtered.map((post) => {
          const style = typeStyles[post.type];
          return (
            <div key={post.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className={`${style.bg} ${style.text} px-3 py-1 rounded-full text-sm font-medium`}>
                  {style.icon} {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                </span>
                <span className="text-gray-500 text-sm">{post.posted}</span>
              </div>
              
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.content}</p>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-gray-600 text-sm">Posted by {post.author}</span>
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
                    ❤️ {post.likes}
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors">
                    💬 {post.comments}
                  </button>
                  <button className="text-gray-600 hover:text-green-500 transition-colors">
                    🔗 Share
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscribe Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">🔔 Stay Updated</h2>
        <p className="mb-4">Get notifications for important community announcements and alerts.</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
