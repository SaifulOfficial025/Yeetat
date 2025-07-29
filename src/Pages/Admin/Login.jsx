import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail, Lock, Eye, EyeOff, Brain, Bot, Cpu, Zap, ArrowRight, Shield, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData.email, formData.password);
    if (res.success) {
      navigate('/admin/dashboard');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              Access Your AI • Enter the Future
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Login Card */}
          <div className="backdrop-blur-xl bg-black/30 rounded-3xl border border-gray-700/50 shadow-2xl">
            <div className="p-8">
              <div className="space-y-8">
                {/* Login Header */}
                <div className="text-center pb-6 border-b border-gray-700/50">
                  <div className="flex justify-center items-center space-x-2 mb-2">
                    <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                    <span className="text-xl font-semibold text-white">Access Portal</span>
                    <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                  <p className="text-gray-400 text-sm">Authenticate your credentials</p>
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
                    placeholder="Enter your email address..."
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="flex items-center text-purple-300 font-medium mb-2">
                    <Lock className="w-5 h-5 mr-2" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-4 pr-12 bg-gray-900/80 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 hover:bg-gray-800/80"
                      placeholder="Enter your password..."
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400/60 hover:text-purple-400 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>


                {/* Login Button */}
                

                <div className="pt-6 text-center">
                  <form onSubmit={handleSubmit}>
                    <button
                      type="submit"
                      className="group relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden w-full justify-center"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <ArrowRight className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="relative z-10">Access AI Capitol</span>
                      <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor'}}></div>
                    </button>
                  </form>
                </div>

                
                {/* Footer Links */}
                <div className="text-center space-y-3 pt-4 border-t border-gray-700/30">
                  <div className="space-y-2">
                  
                    <p className="text-gray-500 text-xs">
                      Forgot Password?{' '}
                      <Link to="/admin/verify_email">
                      <button className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                        Reset Here
                      </button>
                      </Link>
                    </p>

                    <p className="text-gray-500 text-xs">
                      Want to be admin?{' '}
                      <Link to="/admin/signup">
                      <button className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                        Signup Here
                      </button>
                      </Link>
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <ToastContainer />
    </div>
  );
}

export default Login;