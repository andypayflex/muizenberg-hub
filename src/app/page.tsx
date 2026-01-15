import Link from "next/link";

const features = [
  {
    href: "/jobs",
    icon: "💼",
    title: "Jobs Board",
    description: "Find local job opportunities in your community",
    color: "bg-green-500",
  },
  {
    href: "/businesses",
    icon: "🏪",
    title: "Business Directory",
    description: "Discover local businesses and services",
    color: "bg-purple-500",
  },
  {
    href: "/marketplace",
    icon: "🛒",
    title: "Marketplace",
    description: "Buy and sell items in your neighborhood",
    color: "bg-orange-500",
  },
  {
    href: "/emergency",
    icon: "🚨",
    title: "Emergency Services",
    description: "Quick access to emergency contacts",
    color: "bg-red-500",
  },
  {
    href: "/community",
    icon: "📢",
    title: "Community Posts",
    description: "Share news, events, and announcements",
    color: "bg-blue-500",
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          🏘️ Welcome to Community Hub
        </h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Your one-stop platform for everything happening in your local community
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className={`${feature.color} p-6 text-white text-center`}>
              <span className="text-5xl">{feature.icon}</span>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* Recent Activity */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">📰 Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="text-2xl">💼</span>
            <div>
              <p className="font-medium">New job posted: Cashier at Local Grocery</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="text-2xl">🏪</span>
            <div>
              <p className="font-medium">New business: Joe&apos;s Auto Repair</p>
              <p className="text-sm text-gray-500">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="text-2xl">📢</span>
            <div>
              <p className="font-medium">Community meeting this Saturday at 10am</p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
