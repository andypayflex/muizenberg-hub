"use client";

interface EmergencyService {
  id: number;
  name: string;
  number: string;
  icon: string;
  description: string;
  available: string;
}

const emergencyServices: EmergencyService[] = [
  {
    id: 1,
    name: "Police Emergency",
    number: "10111",
    icon: "🚔",
    description: "South African Police Service emergency line",
    available: "24/7",
  },
  {
    id: 2,
    name: "Ambulance",
    number: "10177",
    icon: "🚑",
    description: "Medical emergencies and ambulance services",
    available: "24/7",
  },
  {
    id: 3,
    name: "Fire Department",
    number: "10177",
    icon: "🚒",
    description: "Fire emergencies and rescue services",
    available: "24/7",
  },
  {
    id: 4,
    name: "Local Police Station",
    number: "011-123-4567",
    icon: "👮",
    description: "Your local SAPS station for non-emergencies",
    available: "24/7",
  },
  {
    id: 5,
    name: "Community Watch",
    number: "011-234-5678",
    icon: "👁️",
    description: "Local neighborhood watch patrol",
    available: "6pm - 6am",
  },
  {
    id: 6,
    name: "Local Clinic",
    number: "011-345-6789",
    icon: "🏥",
    description: "Community health clinic",
    available: "Mon-Fri 7am-7pm",
  },
  {
    id: 7,
    name: "Electricity Faults",
    number: "0800-111-222",
    icon: "⚡",
    description: "Report power outages and electrical faults",
    available: "24/7",
  },
  {
    id: 8,
    name: "Water Emergency",
    number: "0800-333-444",
    icon: "💧",
    description: "Report burst pipes and water issues",
    available: "24/7",
  },
  {
    id: 9,
    name: "Poison Hotline",
    number: "0861-555-777",
    icon: "☠️",
    description: "Poison control center",
    available: "24/7",
  },
  {
    id: 10,
    name: "Child Protection",
    number: "0800-055-555",
    icon: "👶",
    description: "Childline South Africa",
    available: "24/7",
  },
  {
    id: 11,
    name: "Gender-Based Violence",
    number: "0800-150-150",
    icon: "🤝",
    description: "GBV Command Centre",
    available: "24/7",
  },
  {
    id: 12,
    name: "Mental Health Line",
    number: "0800-567-567",
    icon: "💚",
    description: "SADAG mental health support",
    available: "24/7",
  },
];

export default function EmergencyPage() {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number.replace(/-/g, "")}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">🚨 Emergency Services</h1>
        <p className="text-gray-600">Quick access to emergency contacts - tap to call</p>
      </div>

      {/* Critical Emergency Banner */}
      <div className="bg-red-600 text-white rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">⚠️ Life-Threatening Emergency?</h2>
        <p className="mb-4">For immediate life-threatening emergencies, call:</p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleCall("10111")}
            className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-xl hover:bg-red-50 transition-colors"
          >
            🚔 Police: 10111
          </button>
          <button
            onClick={() => handleCall("10177")}
            className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-xl hover:bg-red-50 transition-colors"
          >
            🚑 Ambulance: 10177
          </button>
        </div>
      </div>

      {/* All Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emergencyServices.map((service) => (
          <button
            key={service.id}
            onClick={() => handleCall(service.number)}
            className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg hover:scale-102 transition-all duration-200 border-2 border-transparent hover:border-red-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{service.icon}</span>
              <div>
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-2xl font-bold text-red-600">{service.number}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{service.description}</p>
            <p className="text-gray-500 text-sm mt-2">🕐 {service.available}</p>
          </button>
        ))}
      </div>

      {/* Safety Tips */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">💡 Emergency Tips</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Stay calm and speak clearly when calling emergency services</li>
          <li>• Know your exact address or location</li>
          <li>• Don&apos;t hang up until the operator tells you to</li>
          <li>• Keep this page bookmarked for quick access</li>
          <li>• Save important numbers in your phone contacts</li>
        </ul>
      </div>
    </div>
  );
}
