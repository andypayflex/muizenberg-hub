"use client";

interface EmergencyService {
  id: number;
  name: string;
  number: string;
  icon: string;
  description: string;
  priority: "critical" | "local" | "utility" | "support";
}

const emergencyServices: EmergencyService[] = [
  {
    id: 1,
    name: "Police Emergency",
    number: "10111",
    icon: "🚔",
    description: "SAPS emergency line",
    priority: "critical",
  },
  {
    id: 2,
    name: "Ambulance",
    number: "10177",
    icon: "🚑",
    description: "Medical emergencies",
    priority: "critical",
  },
  {
    id: 3,
    name: "Fire & Rescue",
    number: "021-590-1900",
    icon: "🚒",
    description: "City of Cape Town Fire",
    priority: "critical",
  },
  {
    id: 4,
    name: "Muizenberg SAPS",
    number: "021-787-9000",
    icon: "👮",
    description: "Local police station",
    priority: "local",
  },
  {
    id: 5,
    name: "Muizenberg Neighbourhood Watch",
    number: "082-123-4567",
    icon: "👁️",
    description: "Community patrol",
    priority: "local",
  },
  {
    id: 6,
    name: "NSRI Station 16",
    number: "021-788-5375",
    icon: "⛵",
    description: "Sea rescue (Muizenberg/Fish Hoek)",
    priority: "local",
  },
  {
    id: 7,
    name: "Shark Spotters",
    number: "078-174-4757",
    icon: "🦈",
    description: "Beach safety updates",
    priority: "local",
  },
  {
    id: 8,
    name: "City Power Faults",
    number: "0860-103-089",
    icon: "⚡",
    description: "Electricity outages",
    priority: "utility",
  },
  {
    id: 9,
    name: "Water & Sanitation",
    number: "0860-103-089",
    icon: "💧",
    description: "Burst pipes, water issues",
    priority: "utility",
  },
  {
    id: 10,
    name: "Poison Control",
    number: "0861-555-777",
    icon: "☠️",
    description: "24/7 poison hotline",
    priority: "support",
  },
  {
    id: 11,
    name: "Childline SA",
    number: "0800-055-555",
    icon: "👶",
    description: "Child protection",
    priority: "support",
  },
  {
    id: 12,
    name: "SADAG Mental Health",
    number: "0800-567-567",
    icon: "💚",
    description: "24/7 mental health support",
    priority: "support",
  },
];

export default function EmergencyPage() {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number.replace(/[^0-9]/g, "")}`;
  };

  const local = emergencyServices.filter((s) => s.priority === "local");
  const utility = emergencyServices.filter((s) => s.priority === "utility");
  const support = emergencyServices.filter((s) => s.priority === "support");

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text">🚨 Emergency Services</h1>
          <p className="text-gray-600 mt-1">
            Tap any number to call directly
          </p>
        </div>

        {/* Critical Emergency Banner */}
        <div className="rounded-2xl p-6 mb-8 text-white bg-gradient-to-r from-red-600 to-red-500">
          <h2 className="text-xl font-bold mb-2">⚠️ Life-Threatening Emergency?</h2>
          <p className="text-red-100 mb-4">Call immediately:</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCall("10111")}
              className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors"
            >
              🚔 Police: 10111
            </button>
            <button
              onClick={() => handleCall("10177")}
              className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors"
            >
              🚑 Ambulance: 10177
            </button>
          </div>
        </div>

        {/* Local Muizenberg Services */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-ocean-deep mb-4 flex items-center gap-2">
            <span>🏖️</span> Local Muizenberg
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {local.map((service) => (
              <button
                key={service.id}
                onClick={() => handleCall(service.number)}
                className="card p-4 text-left hover:border-teal-300 border-2 border-transparent transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <p className="font-semibold text-ocean-deep">{service.name}</p>
                    <p className="text-xl font-bold text-teal">{service.number}</p>
                    <p className="text-xs text-gray-500">{service.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Utilities */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-ocean-deep mb-4 flex items-center gap-2">
            <span>🔧</span> Utilities
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {utility.map((service) => (
              <button
                key={service.id}
                onClick={() => handleCall(service.number)}
                className="card p-4 text-left hover:border-amber-300 border-2 border-transparent transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <p className="font-semibold text-ocean-deep">{service.name}</p>
                    <p className="text-xl font-bold text-amber-600">{service.number}</p>
                    <p className="text-xs text-gray-500">{service.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Support Lines */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-ocean-deep mb-4 flex items-center gap-2">
            <span>💚</span> Support Lines (24/7)
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {support.map((service) => (
              <button
                key={service.id}
                onClick={() => handleCall(service.number)}
                className="card p-4 text-left hover:border-emerald-300 border-2 border-transparent transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <p className="font-semibold text-ocean-deep">{service.name}</p>
                    <p className="text-xl font-bold text-emerald-600">{service.number}</p>
                    <p className="text-xs text-gray-500">{service.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Safety Tips */}
        <div className="card p-6 bg-sky-50/50">
          <h3 className="font-semibold text-ocean-deep mb-3">
            💡 Muizenberg Safety Tips
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>🦈 Check Shark Spotter flags before swimming (White = safe, Red = shark spotted)</li>
            <li>🌊 Swim between the flags at lifeguard-patrolled areas</li>
            <li>🚗 Don&apos;t leave valuables visible in parked cars</li>
            <li>📱 Save these numbers in your phone for quick access</li>
            <li>👥 Report suspicious activity to Neighbourhood Watch</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
