import React, { useEffect } from 'react';
import { Brain, Bot, Cpu, Zap, Gift, Crown, CreditCard, Clock } from "lucide-react";
import { useData } from "../../Context/DataContext";

function Dashboard() {
  const { stats, fetchStats } = useData();

  useEffect(() => {
    fetchStats && fetchStats();
    // eslint-disable-next-line
  }, []);

  const statConfig = [
    {
      title: "Free AI",
      key: "free",
      icon: Gift,
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-500/30",
      iconColor: "text-green-400"
    },
    {
      title: "Freemium",
      key: "freemium",
      icon: Crown,
      color: "from-purple-500 to-violet-600",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400"
    },
    {
      title: "Paid",
      key: "paid",
      icon: CreditCard,
      color: "from-blue-500 to-cyan-600",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      title: "Total",
      key: "total",
      icon: Clock,
      color: "from-orange-500 to-amber-600",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white"/>
              <circle cx="18" cy="18" r="1" fill="white"/>
              <path d="M2,2 L18,2 L18,18" stroke="white" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <Brain className="w-16 h-16 text-cyan-400 mr-4 animate-pulse" />
            <Bot className="w-20 h-20 text-purple-400 animate-bounce" />
            <Cpu className="w-16 h-16 text-pink-400 ml-4 animate-pulse" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            AI: Capitol
          </h1>
          <h2 className="text-2xl text-gray-300 font-light tracking-wide">
            Dashboard • Intelligence Hub
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Welcome Message */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="backdrop-blur-xl bg-black/30 rounded-3xl border border-gray-700/50 shadow-2xl p-8">
            <div className="text-center">
              <div className="flex justify-center items-center space-x-2 mb-4">
                <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
                <span className="text-3xl font-bold text-white">Welcome</span>
                <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                Your AI ecosystem is thriving. Monitor, manage, and maximize the potential of artificial intelligence tools across all categories.
              </p>

            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statConfig.map((stat, index) => {
              const IconComponent = stat.icon;
              const count = stats && stats[stat.key] !== undefined ? stats[stat.key] : 0;
              return (
                <div
                  key={index}
                  className={`backdrop-blur-xl bg-black/30 rounded-2xl border ${stat.borderColor} shadow-2xl p-6 hover:scale-105 transform transition-all duration-300 group`}
                >
                  <div className="text-center">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-20 mx-auto mb-4 w-fit`}>
                      <IconComponent className={`w-10 h-10 ${stat.iconColor} group-hover:animate-pulse`} />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{count}</div>
                    <div className={`text-lg font-medium ${stat.iconColor}`}>{stat.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="backdrop-blur-xl bg-black/30 rounded-3xl border border-gray-700/50 shadow-2xl p-6">
            <div className="text-center">
              <div className="flex justify-center items-center space-x-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">System Online</span>
                </div>
                


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;