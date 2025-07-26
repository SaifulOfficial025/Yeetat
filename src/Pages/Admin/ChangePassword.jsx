import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Shield, Brain, Bot, Cpu, Zap, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function ChangePassword() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword === formData.confirmPassword && formData.newPassword.length >= 8) {
      console.log('Password change request:', { newPassword: formData.newPassword });
      // Add your password change logic here
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Password validation
  const hasMinLength = formData.newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(formData.newPassword);
  const hasLowerCase = /[a-z]/.test(formData.newPassword);
  const hasNumber = /\d/.test(formData.newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword);
  const passwordsMatch = formData.newPassword === formData.confirmPassword && formData.confirmPassword.length > 0;

  const isFormValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && passwordsMatch;

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
              Reset Password • Secure Future
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Change Password Card */}
          <div className="backdrop-blur-xl bg-black/30 rounded-3xl border border-gray-700/50 shadow-2xl">
            <div className="p-8">
              <div className="space-y-8">
                {/* Header */}
                <div className="text-center pb-6 border-b border-gray-700/50">
                  <div className="flex justify-center items-center space-x-2 mb-2">
                    <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                    <span className="text-xl font-semibold text-white">Password Reset</span>
                    <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                  <p className="text-gray-400 text-sm">Create a new secure password for your account</p>
                </div>

                {/* New Password Field */}
                <div className="space-y-2">
                  <label className="flex items-center text-cyan-300 font-medium mb-2">
                    <Lock className="w-5 h-5 mr-2" />
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full p-4 pr-12 bg-gray-900/80 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-gray-800/80"
                      placeholder="Enter new password..."
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleNewPasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400/60 hover:text-cyan-400 transition-colors duration-200"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="flex items-center text-purple-300 font-medium mb-2">
                    <Shield className="w-5 h-5 mr-2" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-4 pr-12 bg-gray-900/80 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 hover:bg-gray-800/80"
                      placeholder="Confirm new password..."
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400/60 hover:text-purple-400 transition-colors duration-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-900/50 rounded-xl border border-yellow-500/30 p-4">
                  <h3 className="text-yellow-300 font-medium mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security Requirements
                  </h3>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className={`flex items-center space-x-2 ${hasMinLength ? 'text-green-400' : 'text-gray-400'}`}>
                      {hasMinLength ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${hasUpperCase ? 'text-green-400' : 'text-gray-400'}`}>
                      {hasUpperCase ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>One uppercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${hasLowerCase ? 'text-green-400' : 'text-gray-400'}`}>
                      {hasLowerCase ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>One lowercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${hasNumber ? 'text-green-400' : 'text-gray-400'}`}>
                      {hasNumber ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>One number</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${hasSpecialChar ? 'text-green-400' : 'text-gray-400'}`}>
                      {hasSpecialChar ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>One special character</span>
                    </div>
                  </div>
                </div>

                {/* Password Match Status */}
                <div className={`flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border ${passwordsMatch ? 'border-green-500/30' : formData.confirmPassword ? 'border-red-500/30' : 'border-pink-500/30'}`}>
                  <span className={`font-medium flex items-center ${passwordsMatch ? 'text-green-300' : formData.confirmPassword ? 'text-red-300' : 'text-pink-300'}`}>
                    {passwordsMatch ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
                    Password Match
                  </span>
                  <div className={`w-3 h-3 rounded-full ${passwordsMatch ? 'bg-green-400 animate-pulse' : formData.confirmPassword ? 'bg-red-400' : 'bg-gray-600'}`}></div>
                </div>

                {/* Change Password Button */}
                <div className="pt-6 text-center">
                  <Link to="/admin/dashboard">
                  <button
                    type="button"
                    
                    disabled={!isFormValid}
                    className="group relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <Lock className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="relative z-10">Update Password</span>
                    <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor'}}></div>
                  </button>
                  </Link>
                </div>

                {/* Security Notice */}
                <div className="bg-gray-900/30 rounded-xl p-4 border border-green-500/20">
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-300 text-sm font-medium">Security Notice</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs">
                      Your new password will be encrypted with quantum-level security protocols
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

export default ChangePassword;