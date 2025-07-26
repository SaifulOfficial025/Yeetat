import React, { useState } from 'react';
import { Mail, Shield, Brain, Bot, Cpu, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function VerifyEmail() {
  const [formData, setFormData] = useState({
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email verification request:', formData);
    // Add your email verification logic here
  };

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

      <div className="relative z-10 p-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
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
              Reset Access • Restore Connection
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Verify Email Card */}
          <div className="backdrop-blur-xl bg-black/30 rounded-3xl border border-gray-700/50 shadow-2xl">
            <div className="p-8">
              <div className="space-y-8">
                {/* Header */}
                <div className="text-center pb-6 border-b border-gray-700/50">
                  <div className="flex justify-center items-center space-x-2 mb-2">
                    <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                    <span className="text-xl font-semibold text-white">Email Verification</span>
                    <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                  <p className="text-gray-400 text-sm">Enter your email to reset access credentials</p>
                </div>

                {/* Info Section */}
                <div className="bg-gray-900/50 rounded-xl border border-cyan-500/30 p-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-cyan-300 font-medium mb-2">Secure Reset Process</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        We'll send a secure OTP to your registered email address. 
                        This link will expire in 15 minutes for your security.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center text-cyan-300 font-medium mb-2">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-900/80 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-gray-800/80"
                    placeholder="Enter your registered email address..."
                    required
                  />
                </div>


                {/* Verify Button */}
                <div className="pt-6 text-center">
                  <Link to="/admin/otp">
                  <button
                    type="button"
                    
                    className="group relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden w-full justify-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <Mail className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="relative z-10">Verify Email</span>
                    <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor'}}></div>
                  </button>
                  </Link>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-900/30 rounded-xl p-4 border border-purple-500/20">
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-purple-300 text-sm font-medium">Reset Instructions</span>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-400 text-xs">
                      <p>• Check your inbox and spam folder</p>
                      <p>• Collect the secure OTP within 15 minutes</p>
                      <p>• Create a new strong password</p>
                    </div>
                  </div>
                </div>

                {/* Footer Links */}
                <div className="text-center space-y-3 pt-4 border-t border-gray-700/30">
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">
                      Remember your password?{' '}
                      <Link to="/admin/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200">
                        Back to Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;