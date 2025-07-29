import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem('adminInfo');
    return data ? JSON.parse(data) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await fetch('http://10.10.13.83:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (result.status === 200 && result.data?.token) {
        localStorage.setItem('accessToken', result.data.token);
        localStorage.setItem('adminInfo', JSON.stringify(result.data.admin));
        setUser(result.data.admin);
        toast.success('Login successful!');
        return { success: true };
      } else {
        toast.error(result.message || 'Login failed. Please check your credentials.');
        return { success: false };
      }
    } catch {
      toast.error('Server error. Please try again later.');
      return { success: false };
    }
  };


  const signup = async (name, email, password) => {
    try {
      const response = await fetch('http://10.10.13.83:4000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      if (result.status === 201 && result.data?.token) {
        localStorage.setItem('accessToken', result.data.token);
        localStorage.setItem('adminInfo', JSON.stringify(result.data.admin));
        setUser(result.data.admin);
        toast.success('Signup successful!');
        return { success: true };
      } else {
        toast.error(result.message || 'Signup failed. Please check your info.');
        return { success: false };
      }
    } catch {
      toast.error('Server error. Please try again later.');
      return { success: false };
    }
  };

  // Request password reset (send OTP)
  const requestResetPassword = async (email) => {
    try {
      const response = await fetch('http://10.10.13.83:4000/auth/request-reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (result.status === 200 && result.data?.adminId) {
        toast.success(result.message || 'OTP sent successfully!');
        return { success: true, adminId: result.data.adminId };
      } else {
        toast.error(result.message || 'Failed to send OTP.');
        return { success: false };
      }
    } catch {
      toast.error('Server error. Please try again later.');
      return { success: false };
    }
  };

  // Verify OTP
  const verifyOtp = async (otp, adminId) => {
    try {
      const response = await fetch('http://10.10.13.83:4000/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, adminId }),
      });
      const result = await response.json();
      if (result.status === 200 && result.data?.isVerified) {
        toast.success(result.message || 'OTP verified!');
        return { success: true };
      } else {
        toast.error(result.message || 'Invalid OTP.');
        return { success: false };
      }
    } catch {
      toast.error('Server error. Please try again later.');
      return { success: false };
    }
  };

  // Reset password
  const resetPassword = async (newPassword, adminId) => {
    try {
      const response = await fetch('http://10.10.13.83:4000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, adminId }),
      });
      const result = await response.json();
      if (result.status === 200) {
        toast.success(result.message || 'Password reset successful!');
        return { success: true };
      } else {
        toast.error(result.message || 'Failed to reset password.');
        return { success: false };
      }
    } catch {
      toast.error('Server error. Please try again later.');
      return { success: false };
    }
  };

  const value = {
    user,
    login,
    signup,
    requestResetPassword,
    verifyOtp,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
