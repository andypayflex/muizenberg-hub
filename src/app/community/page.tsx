"use client";

import { useState } from "react";

interface Post {
  id: number;
  type: "event" | "announcement" | "discussion" | "alert";
  title: string;
  content: string;
  author: string;
  posted: string;
  likes: number;
  comments: number;
}

const postTypes = [
  { value: "all", label: "All", icon: "📋" },
  { value: "event", label: "Events", icon: "📅" },
  { value: "announcement", label: "News", icon: "📢" },
  { value: "discussion", label: "Chat", icon: "💬" },
  { value: "alert", label: "Alerts", icon: "⚠️" },
];

const samplePosts: Post[] = [
  {
    id: 1,
    type: "event",
    title: "Beach Cleanup Saturday 8am 🏖️",
    content: "Join us at Surfer's Corner this Saturday for our monthly beach cleanup! Bags and gloves provided. Let's keep Muizenberg beautiful. Coffee afterwards at Café Roux for all volunteers.",
    author: "Muizenberg Beach Keepers",
    posted: "2 hours ago",
    likes: 34,
    comments: 8,
  },
  {
    id: 2,
    type: "alert",
    title: "Shark Spotted - Red Flag 🦈",
    content: "Shark spotted off Surfer's Corner at 2pm today. Beach currently has RED flag. Please stay out of the water until the all-clear. White flag will indicate it's safe to swim again.",
    author: "Shark Spotters",
    posted: "4 hours ago",
    likes: 67,
    comments: 12,
  },
  {
    id: 3,
    type: "announcement",
    title: "New Surf School Opening",
    content: "Excited to announce that 'Stoked Surf Academy' is opening next month at Surfer's Corner! Lessons for all ages and levels. Grand opening special - first lesson 50% off. See you in the water! 🤙",
    author: "Stoked Surf Academy",
    posted: "1 day ago",
    likes: 89,
    comments: 23,
  },
  {
    id: 4,
    type: "discussion",
    title: "Best sunset spot in Muiz?",
    content: "Moving to Muizenberg next week! Where's everyone's favourite spot to watch the sunset? Looking for that perfect end-of-day chill spot. Thanks in advance! 🌅",
    author: "Sarah K.",
    posted: "1 day ago",
    likes: 12,
    comments: 19,
  },
  {
    id: 5,
    type: "event",
    title: "Full Moon Drum Circle - Friday",
    content: "Monthly drum circle at the beach this Friday from 6pm. Bring your drums, djembes, or just come to vibe. Fire will be going. Everyone welcome. Let's make some magic! 🥁🌕",
    author: "Muizenberg Drummers",
    posted: "2 days ago",
    likes: 56,
    comments: 7,
  },
  {
    id: 6,
    type: "discussion",
    title: "Anyone lost a tabby cat?",
    content: "Found a friendly tabby cat near Palmer Road. Orange and white, no collar. Very affectionate, seems well cared for. Currently keeping him safe in my garden. Please share!",
    author: "Tom R.",
    posted: "3 days ago",
    likes: 28,
    comments: 14,
  },
];

const typeStyles = {
  event: { bg: "tag-green", icon: "📅" },
  announcement: { bg: "tag-blue", icon: "📢" },
  discussion: { bg: "tag-ocean", icon: "💬" },
  alert: { bg: "tag-red", icon: "⚠️" },
};

export default function CommunityPage() {
  const [posts] = useState<Post[]>(samplePosts);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filtered = filter === "all"
    ? posts
    : posts.filter((p) => p.type === filter);

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">🏄 Community Feed</h1>
            <p className="text-[var(--ocean-deep)]/60 mt-1">
              What&apos;s happening in Muizenberg
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            + New Post
          </button>
        </div>

        {/* Post Form */}
        {showForm && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold text-[var(--ocean-deep)] mb-4">
              Share with the Community
            </h2>
            <form className="space-y-4">
              <div className="flex gap-4">
                <select className="flex-1">
                  <option value="discussion">💬 Discussion</option>
                  <option value="event">📅 Event</option>
                  <option value="announcement">📢 Announcement</option>
                  <option value="alert">⚠️ Alert</option>
                </select>
                <input type="text" placeholder="Your Name" className="flex-1" />
              </div>
              <input type="text" placeholder="Title" className="w-full" />
              <textarea
                placeholder="What's on your mind, Muizenberg?"
                rows={4}
                className="w-full"
              />
              <button type="submit" className="btn-primary">
                Post
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
              className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-1 ${
                filter === type.value
                  ? "bg-[var(--ocean-medium)] text-white shadow-md"
                  : "bg-white text-[var(--ocean-deep)] hover:bg-[var(--sand)] border border-[var(--sand-dark)]"
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
              <div key={post.id} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${style.bg}`}>
                    {style.icon} {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                  </span>
                  <span className="text-sm text-[var(--ocean-deep)]/50">{post.posted}</span>
                </div>

                <h2 className="text-xl font-semibold text-[var(--ocean-deep)] mb-2">
                  {post.title}
                </h2>
                <p className="text-[var(--ocean-deep)]/70 leading-relaxed mb-4">
                  {post.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--sand-dark)]">
                  <span className="text-sm text-[var(--ocean-deep)]/60">
                    Posted by <span className="font-medium">{post.author}</span>
                  </span>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-[var(--ocean-deep)]/60 hover:text-[var(--hut-red)] transition-colors">
                      ❤️ {post.likes}
                    </button>
                    <button className="flex items-center gap-1 text-[var(--ocean-deep)]/60 hover:text-[var(--hut-blue)] transition-colors">
                      💬 {post.comments}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subscribe Banner */}
        <div 
          className="mt-8 rounded-2xl p-8 text-center text-white"
          style={{ background: "linear-gradient(135deg, var(--ocean-deep) 0%, var(--ocean-medium) 100%)" }}
        >
          <h3 className="text-xl font-bold mb-2">🔔 Stay in the Loop</h3>
          <p className="text-white/80 mb-4">
            Get notified about important community updates and events
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 text-[var(--ocean-deep)]"
            />
            <button className="bg-white text-[var(--ocean-deep)] px-6 py-3 rounded-xl font-semibold hover:bg-[var(--sand)] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
