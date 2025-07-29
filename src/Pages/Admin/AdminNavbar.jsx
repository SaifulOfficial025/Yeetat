import React, { useState } from 'react';
import { Brain, Bot, Plus, List, Edit3, User, LogOut, Menu, X, Home } from "lucide-react";
import { SiHomeassistant } from "react-icons/si";
import { Outlet, Link } from 'react-router-dom';

function AdminNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Home",
      icon: Home,
      href: "/admin/dashboard",
      color: "text-cyan-400"
    },
    {
      name: "Add AI",
      icon: Plus,
      href: "/admin/add_ai",
      color: "text-cyan-400"
    },
    {
      name: "AI List",
      icon: List,
      href: "/admin/ai_list",
      color: "text-purple-400"
    },
    // {
    //   name: "Edit AI",
    //   icon: Edit3,
    //   href: "/admin/edit_ai",
    //   color: "text-pink-400"
    // },
    {
      name: "Change Password",
      icon: User,
      href: "/admin/verify_email",
      color: "text-green-400"
    },
    {
      name: "Logout",
      icon: LogOut,
      href: "/admin/login",
      color: "text-red-400"
    }
  ];

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin/login";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main Navbar */}
      <nav className="relative backdrop-blur-2xl bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-slate-900/95 border-b border-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 shadow-2xl">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
        
        {/* Glass morphism effect */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <Brain className="w-9 h-9 text-cyan-400 animate-pulse relative z-10" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg animate-pulse"></div>
                </div>
                <div className="relative">
                  <Bot className="w-11 h-11 text-purple-400 group-hover:animate-bounce relative z-10" />
                  <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg"></div>
                </div>
                <div className="relative">
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
                    AI Capitol
                  </span>
                  <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-cyan-400/50 via-purple-400/50 to-pink-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-2">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  if (item.name === 'Logout') {
                    return (
                      <button
                        key={index}
                        onClick={handleLogout}
                        className={`group relative flex items-center px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 hover:scale-105 transform hover:bg-red-900/20 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 border border-transparent hover:border-white/10 backdrop-blur-sm`}
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-500/10 to-red-600/10"></div>
                        <IconComponent className="w-5 h-5 mr-3 text-red-400 group-hover:animate-pulse relative z-10 group-hover:drop-shadow-lg" />
                        <span className="text-gray-300 group-hover:text-white relative z-10 font-medium">
                          {item.name}
                        </span>
                        {/* Bottom border animation */}
                        <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-400 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={index}
                      to={item.href}
                      className={`group relative flex items-center px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 hover:scale-105 transform hover:bg-white/5 hover:shadow-lg hover:shadow-purple-500/10 border border-transparent hover:border-white/10 backdrop-blur-sm`}
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
                      <IconComponent className={`${item.color} w-5 h-5 mr-3 group-hover:animate-pulse relative z-10 group-hover:drop-shadow-lg`} />
                      <span className="text-gray-300 group-hover:text-white relative z-10 font-medium">
                        {item.name}
                      </span>
                      {/* Bottom border animation */}
                      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative inline-flex items-center justify-center p-3 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 backdrop-blur-sm group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 relative z-10" />
                ) : (
                  <Menu className="w-6 h-6 relative z-10" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 relative">
            {/* Mobile menu background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-gray-900/95 backdrop-blur-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
            
            <div className="relative px-4 pt-4 pb-6 space-y-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                if (item.name === 'Logout') {
                  return (
                    <button
                      key={index}
                      onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                      className="group relative flex items-center px-5 py-4 rounded-2xl text-base font-medium transition-all duration-300 hover:bg-red-900/20 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 border border-transparent hover:border-white/10 backdrop-blur-sm"
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-500/10 to-red-600/10"></div>
                      <IconComponent className="w-6 h-6 mr-4 text-red-400 group-hover:animate-pulse relative z-10 group-hover:drop-shadow-lg" />
                      <span className="text-gray-300 group-hover:text-white relative z-10 font-medium">
                        {item.name}
                      </span>
                      {/* Side border animation */}
                      <div className="absolute left-0 top-1/2 h-0 w-1 bg-red-400 group-hover:h-full group-hover:top-0 transition-all duration-300 rounded-r-full"></div>
                    </button>
                  );
                }
                return (
                  <Link
                    key={index}
                    to={item.href}
                    className="group relative flex items-center px-5 py-4 rounded-2xl text-base font-medium transition-all duration-300 hover:bg-white/5 hover:shadow-lg hover:shadow-purple-500/10 border border-transparent hover:border-white/10 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
                    <IconComponent className={`${item.color} w-6 h-6 mr-4 group-hover:animate-pulse relative z-10 group-hover:drop-shadow-lg`} />
                    <span className="text-gray-300 group-hover:text-white relative z-10 font-medium">
                      {item.name}
                    </span>
                    {/* Side border animation */}
                    <div className="absolute left-0 top-1/2 h-0 w-1 bg-gradient-to-b from-cyan-400 to-purple-400 group-hover:h-full group-hover:top-0 transition-all duration-300 rounded-r-full"></div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom animated border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 via-purple-400/50 via-pink-400/50 to-transparent animate-pulse"></div>
      </nav>

        {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
}

export default AdminNavbar;