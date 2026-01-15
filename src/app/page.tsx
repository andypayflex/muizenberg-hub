import Link from "next/link";

const features = [
  {
    href: "/jobs",
    icon: "💼",
    title: "Jobs Board",
    description: "Local opportunities from our community",
    bgColor: "bg-emerald-50",
  },
  {
    href: "/businesses",
    icon: "🏪",
    title: "Local Directory",
    description: "Support our Muizenberg businesses",
    bgColor: "bg-teal-50",
  },
  {
    href: "/marketplace",
    icon: "🛒",
    title: "Marketplace",
    description: "Buy & sell with your neighbours",
    bgColor: "bg-amber-50",
  },
  {
    href: "/emergency",
    icon: "🚨",
    title: "Emergency",
    description: "Quick access when you need it",
    bgColor: "bg-red-50",
  },
  {
    href: "/community",
    icon: "🏄",
    title: "Community Feed",
    description: "What's happening in Muizenberg",
    bgColor: "bg-sky-50",
  },
];

const recentActivity = [
  { icon: "🏄", text: "Surf Emporium holiday lessons now booking", time: "2 hours ago" },
  { icon: "💼", text: "Barista needed at Empire Cafe", time: "5 hours ago" },
  { icon: "🏪", text: "Gary's Surf School - 35 years of stoke!", time: "Yesterday" },
  { icon: "📢", text: "Beach cleanup at Surfer's Corner Saturday 8am", time: "Yesterday" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-ocean-deep mb-6 shadow-sm border border-gray-100">
              <span>🌊</span>
              <span>Your Muizenberg Community Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
              Welcome to<br />Muizenberg Hub
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with your neighbours, discover local businesses, 
              find opportunities, and stay in the loop with everything 
              happening in our beautiful seaside village.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/community" className="btn-primary">
                <span>Explore Community</span>
                <span>→</span>
              </Link>
              <Link href="/businesses" className="btn-secondary">
                <span>Local Directory</span>
              </Link>
            </div>
          </div>

          {/* Beach huts illustration */}
          <div className="flex justify-center gap-2 mt-12">
            {["#E63946", "#F4A261", "#2A9D8F", "#52B788", "#457B9D"].map((color, i) => (
              <div
                key={i}
                className="w-12 h-16 md:w-16 md:h-20 rounded-t-lg shadow-lg"
                style={{ background: color }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-ocean-deep mb-8 text-center">
          What&apos;s on the Hub
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="card p-6 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-ocean-deep mb-2 group-hover:text-teal transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">
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
            <h2 className="text-2xl font-bold text-ocean-deep">
              🌊 Latest from Muizenberg
            </h2>
            <Link href="/community" className="text-teal font-medium hover:underline">
              View all →
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-sand/50 hover:bg-sand transition-colors cursor-pointer"
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-ocean-deep">{item.text}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-3xl p-8 md:p-12 text-center text-white bg-gradient-to-r from-slate-800 to-slate-700 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Part of our community?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a local business, looking for work, or just want to 
              connect with neighbours — this is your space.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/businesses" 
                className="bg-white text-slate-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
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
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏖️</span>
              <span className="font-bold text-ocean-deep">Muizenberg Hub</span>
            </div>
            <p className="text-gray-500 text-sm">
              Made with 🌊 for our community
            </p>
          </div>
        </div>
        <div className="hut-stripe" />
      </footer>
    </div>
  );
}
