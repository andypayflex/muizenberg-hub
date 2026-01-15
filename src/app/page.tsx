import Link from "next/link";

const features = [
  {
    href: "/jobs",
    icon: "💼",
    title: "Jobs Board",
    description: "Local opportunities from our community",
    color: "var(--hut-green)",
    tagClass: "tag-green",
  },
  {
    href: "/businesses",
    icon: "🏪",
    title: "Local Directory",
    description: "Support our Muizenberg businesses",
    color: "var(--hut-blue)",
    tagClass: "tag-blue",
  },
  {
    href: "/marketplace",
    icon: "🛒",
    title: "Marketplace",
    description: "Buy & sell with your neighbours",
    color: "var(--hut-yellow)",
    tagClass: "tag-yellow",
  },
  {
    href: "/emergency",
    icon: "🚨",
    title: "Emergency",
    description: "Quick access when you need it",
    color: "var(--hut-red)",
    tagClass: "tag-red",
  },
  {
    href: "/community",
    icon: "🏄",
    title: "Community Feed",
    description: "What's happening in Muizenberg",
    color: "var(--ocean-medium)",
    tagClass: "tag-ocean",
  },
];

const recentActivity = [
  { icon: "🏄", text: "Surf lesson bookings open for February", time: "2 hours ago", type: "event" },
  { icon: "💼", text: "Barista needed at Café Roux", time: "5 hours ago", type: "job" },
  { icon: "🏪", text: "New listing: Muizenberg Yoga Studio", time: "Yesterday", type: "business" },
  { icon: "📢", text: "Beach cleanup this Saturday 8am", time: "Yesterday", type: "community" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 wave-bg opacity-50" />
        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-[var(--ocean-deep)] mb-6 shadow-sm">
              <span>🌊</span>
              <span>Your Muizenberg Community Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
              Welcome to<br />Muizenberg Hub
            </h1>
            
            <p className="text-xl text-[var(--ocean-deep)]/70 mb-8 leading-relaxed">
              Connect with your neighbours, discover local businesses, 
              find opportunities, and stay in the loop with everything 
              happening in our beautiful seaside village.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/community" className="btn-primary inline-flex items-center gap-2">
                <span>Explore Community</span>
                <span>→</span>
              </Link>
              <Link href="/businesses" className="btn-secondary inline-flex items-center gap-2">
                <span>Local Directory</span>
              </Link>
            </div>
          </div>

          {/* Beach huts illustration */}
          <div className="flex justify-center gap-2 mt-12 float-animation">
            {["🔴", "🟡", "🔵", "🟢", "🟣"].map((color, i) => (
              <div
                key={i}
                className="w-12 h-16 md:w-16 md:h-20 rounded-t-lg shadow-lg"
                style={{
                  background: ["#E63946", "#F4A261", "#2A9D8F", "#52B788", "#457B9D"][i],
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[var(--ocean-deep)] mb-8 text-center">
          What&apos;s on the Hub
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="card p-6 group"
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${feature.color}20` }}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[var(--ocean-deep)] mb-2 group-hover:text-[var(--hut-blue)] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[var(--ocean-deep)]/60">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="card p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--ocean-deep)]">
              🌊 Latest from Muizenberg
            </h2>
            <Link href="/community" className="text-[var(--hut-blue)] font-medium hover:underline">
              View all →
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-[var(--sand)]/50 hover:bg-[var(--sand)] transition-colors cursor-pointer"
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-[var(--ocean-deep)]">{item.text}</p>
                  <p className="text-sm text-[var(--ocean-deep)]/50">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div 
          className="rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--ocean-deep) 0%, var(--ocean-medium) 100%)" }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Part of our community?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a local business, looking for work, or just want to 
              connect with neighbours — this is your space.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/businesses" 
                className="bg-white text-[var(--ocean-deep)] px-6 py-3 rounded-xl font-semibold hover:bg-[var(--sand)] transition-colors"
              >
                List Your Business
              </Link>
              <Link 
                href="/jobs" 
                className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
              >
                Post a Job
              </Link>
            </div>
          </div>
          
          {/* Decorative waves */}
          <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
            <svg viewBox="0 0 1440 320" className="w-full h-full">
              <path fill="white" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--sand-dark)] mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏖️</span>
              <span className="font-bold text-[var(--ocean-deep)]">Muizenberg Hub</span>
            </div>
            <p className="text-[var(--ocean-deep)]/50 text-sm">
              Made with 🌊 for our community
            </p>
          </div>
        </div>
        <div className="hut-stripe" />
      </footer>
    </div>
  );
}
