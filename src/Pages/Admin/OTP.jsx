import React, { useState, useRef, useEffect } from 'react';
import { Shield, Brain, Bot, Cpu, Zap, ArrowRight, RefreshCw, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

function OTP() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const inputRefs = useRef([]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (value, index) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 4) {
      console.log('OTP verification:', otpString);
      // Add your OTP verification logic here
    }
  };

  const handleResend = () => {
    setTimeLeft(300); // Reset timer to 5 minutes
    setOtp(['', '', '', '']); // Clear OTP inputs
    inputRefs.current[0]?.focus(); // Focus first input
    console.log('Resending OTP...');
    // Add your resend OTP logic here
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
              Verify Identity • Secure Access
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* OTP Verification Card */}
          <div className="backdrop-blur-xl bg-black/30 rounded-3xl border border-gray-700/50 shadow-2xl">
            <div className="p-8">
              <div className="space-y-8">
                {/* Header */}
                <div className="text-center pb-6 border-b border-gray-700/50">
                  <div className="flex justify-center items-center space-x-2 mb-2">
                    <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                    <span className="text-xl font-semibold text-white">OTP Verification</span>
                    <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                  <p className="text-gray-400 text-sm">Enter the 4-digit code sent to your email</p>
                </div>

                {/* Timer Display */}
                <div className="bg-gray-900/50 rounded-xl border border-purple-500/30 p-4">
                  <div className="flex items-center justify-center space-x-3">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-300 font-medium">Time Remaining:</span>
                    <span className={`font-bold text-lg ${timeLeft <= 60 ? 'text-red-400 animate-pulse' : 'text-purple-400'}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>

                {/* OTP Input Fields */}
                <div className="space-y-4">
                  <label className="flex items-center text-cyan-300 font-medium mb-2 justify-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security Code
                  </label>
                  <div className="flex justify-center space-x-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value.replace(/\D/g, ''), index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-16 h-16 text-center text-2xl font-bold bg-gray-900/80 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-gray-800/80"
                        placeholder="0"
                      />
                    ))}
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-green-500/30">
                  <span className="text-green-300 font-medium flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Secure Verification
                  </span>
                  <div className="flex space-x-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          otp[i] ? 'bg-green-400' : 'bg-gray-600'
                        } transition-all duration-300`}
                      />
                    ))}
                  </div>
                </div>

                {/* Verify Button */}
                <div className="pt-6 text-center">
                  <Link to="/admin/change_password">
                  <button
                    type="button"
                    
                    disabled={otp.some(digit => !digit) || timeLeft === 0}
                    className="group relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <ArrowRight className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="relative z-10">Verify OTP</span>
                    <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor'}}></div>
                  </button>
                  </Link>
                </div>

                {/* Resend Section */}
                <div className="bg-gray-900/30 rounded-xl p-4 border border-yellow-500/20">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-3">Didn't receive the code?</p>
                    <button
                      onClick={handleResend}
                      disabled={timeLeft > 0}
                      className="inline-flex items-center px-6 py-2 bg-yellow-600/20 border border-yellow-500/30 rounded-lg text-yellow-300 hover:bg-yellow-600/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {timeLeft > 0 ? 'Resend Available Soon' : 'Resend Code'}
                    </button>
                  </div>
                </div>

                {/* Footer Links */}
                <div className="text-center space-y-3 pt-4 border-t border-gray-700/30">
                  <div className="space-y-2">
                    <p className="text-gray-500 text-xs">
                      Wrong email?{' '}
                      <Link to="/admin/verify_email">
                      <button className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                        Go Back
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
    </div>
  );
}

export default OTP;