"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

interface Post {
  id: string;
  type: "event" | "announcement" | "discussion" | "alert";
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
  created_at: string;
}

const postTypes = [
  { value: "all", label: "All", icon: "📋" },
  { value: "event", label: "Events", icon: "📅" },
  { value: "announcement", label: "News", icon: "📢" },
  { value: "discussion", label: "Chat", icon: "💬" },
  { value: "alert", label: "Alerts", icon: "⚠️" },
];

const typeStyles: Record<string, { bg: string; icon: string }> = {
  event: { bg: "tag-green", icon: "📅" },
  announcement: { bg: "tag-blue", icon: "📢" },
  discussion: { bg: "tag-ocean", icon: "💬" },
  alert: { bg: "tag-red", icon: "⚠️" },
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ type: "discussion", title: "", content: "", author: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    if (res.ok) {
      setShowForm(false);
      setFormData({ type: "discussion", title: "", content: "", author: "" });
      fetchPosts();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to create post");
    }
    setLoading(false);
  };

  const filtered = filter === "all"
    ? posts
    : posts.filter((p) => p.type === filter);

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
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">🏄 Community Feed</h1>
            <p className="text-gray-600 mt-1">
              What&apos;s happening in Muizenberg
            </p>
          </div>
          {user ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary"
            >
              + New Post
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
              Share with the Community
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="discussion">💬 Discussion</option>
                  <option value="event">📅 Event</option>
                  <option value="announcement">📢 Announcement</option>
                  <option value="alert">⚠️ Alert</option>
                </select>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <textarea
                placeholder="What's on your mind, Muizenberg?"
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
              <div className="flex gap-2">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Posting..." : "Post"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {postTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFilter(type.value)}
              className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-1 ${
                filter === type.value
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
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
            const style = typeStyles[post.type] || typeStyles.discussion;
            return (
              <div key={post.id} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${style.bg}`}>
                    {style.icon} {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">{formatTime(post.created_at)}</span>
                </div>

                <h2 className="text-xl font-semibold text-ocean-deep mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    Posted by <span className="font-medium text-gray-700">{post.author}</span>
                  </span>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                      ❤️ {post.likes}
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-teal transition-colors">
                      💬 {post.comments}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="card p-8 text-center text-gray-500">
            No posts yet. Be the first to share something!
          </div>
        )}

        {/* Subscribe Banner */}
        <div className="mt-8 rounded-2xl p-8 text-center text-white bg-gradient-to-r from-slate-800 to-slate-700">
          <h3 className="text-xl font-bold mb-2">🔔 Stay in the Loop</h3>
          <p className="text-gray-300 mb-4">
            Get notified about important community updates and events
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1"
            />
            <button className="bg-white text-slate-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
