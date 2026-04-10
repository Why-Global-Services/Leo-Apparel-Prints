'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle, Sparkles, Shield, Zap } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clear server message after 5 seconds
  useEffect(() => {
    if (serverMessage.text) {
      const timer = setTimeout(() => {
        setServerMessage({ type: '', text: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [serverMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setServerMessage({ type: '', text: '' });

    const isValid = isLogin ? validateLogin() : validateRegister();
    
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isLogin) {
        setServerMessage({ 
          type: 'success', 
          text: 'Login successful! Redirecting...' 
        });
        console.log('Login data:', { email: formData.email, password: formData.password });
      } else {
        setServerMessage({ 
          type: 'success', 
          text: 'Registration successful! Please login.' 
        });
        setTimeout(() => {
          setIsLogin(true);
          setFormData({ ...formData, password: '', confirmPassword: '' });
        }, 1500);
        console.log('Register data:', formData);
      }
    } catch (error) {
      setServerMessage({ 
        type: 'error', 
        text: error.message || 'An error occurred. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setServerMessage({ type: '', text: '' });
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  const rightPanelVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      } 
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.3
      } 
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: 0.4 + (i * 0.1),
        duration: 0.5
      } 
    })
  };

  // Animated background gradient
  const gradientStyle = {
    background: `
      radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
        rgba(0, 62, 155, 0.08) 0%,
        rgba(14, 165, 233, 0.05) 50%,
        rgba(255, 255, 255, 1) 100%
      )
    `
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-white"
      style={gradientStyle}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-blue/5 via-accent/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-primary-blue/5 via-accent/5 to-transparent rounded-full blur-3xl"
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-blue/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -30, 30, -30],
              x: [null, 20, -20, 20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Container - Full Width Horizontal Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
          
          {/* Left Panel - Info/Features */}
          <motion.div
            variants={cardVariants}
            className="relative overflow-hidden bg-gradient-to-br from-primary-blue to-primary-blue-dark p-8 lg:p-12 text-white"
          >
            {/* Animated background for left panel */}
            <div className="absolute inset-0 bg-black/20" />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="inline-flex items-center gap-2 mb-8"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">BrandName</span>
              </motion.div>

              {/* Welcome Text */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl lg:text-4xl font-bold mb-4"
              >
                {isLogin ? 'Welcome Back!' : 'Join Our Community'}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white/80 mb-8 leading-relaxed"
              >
                {isLogin 
                  ? 'Sign in to access your account and continue your journey with us.' 
                  : 'Create an account to unlock exclusive features and start your adventure.'}
              </motion.p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  { icon: Shield, text: "Secure Authentication" },
                  { icon: Zap, text: "Lightning Fast Access" },
                  { icon: Sparkles, text: "Premium Features" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={featureVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-3 text-white/90"
                  >
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-4 h-4" />
                    </div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex gap-6 pt-6 border-t border-white/20"
              >
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-xs text-white/60">Active Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-xs text-white/60">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-xs text-white/60">Support</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Panel - Form */}
          <motion.div
            variants={rightPanelVariants}
            className="bg-white p-8 lg:p-12"
          >
            {/* Tab Headers */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
              <button
                onClick={() => setIsLogin(true)}
                className={`pb-3 px-2 font-semibold transition-all duration-300 relative ${
                  isLogin 
                    ? 'text-primary-blue' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Sign In
                {isLogin && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-blue to-accent"
                  />
                )}
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`pb-3 px-2 font-semibold transition-all duration-300 relative ${
                  !isLogin 
                    ? 'text-primary-blue' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Sign Up
                {!isLogin && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-blue to-accent"
                  />
                )}
              </button>
            </div>

            {/* Server Message */}
            <AnimatePresence>
              {serverMessage.text && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`mb-6 p-3 rounded-lg flex items-center gap-2 ${
                    serverMessage.type === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {serverMessage.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span className="text-sm">{serverMessage.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? 'login' : 'register'}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Name Field - Only for Register */}
                {!isLogin && (
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-primary-blue" />
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${
                          errors.name 
                            ? 'border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {/* Email Field */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary-blue" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary-blue" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${
                        errors.password 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </motion.p>
                  )}
                </motion.div>

                {/* Confirm Password - Only for Register */}
                {!isLogin && (
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-primary-blue" />
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${
                          errors.confirmPassword 
                            ? 'border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {/* Forgot Password Link - Only for Login */}
                {isLogin && (
                  <motion.div variants={itemVariants} className="text-right">
                    <button
                      type="button"
                      className="text-sm text-primary-blue hover:text-accent transition-colors"
                    >
                      Forgot password?
                    </button>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-gradient w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          {isLogin ? 'Sign In' : 'Create Account'}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </motion.div>

                {/* Toggle Mode Link */}
                <motion.div variants={itemVariants} className="text-center pt-2">
                  <p className="text-gray-500 text-sm">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-primary-blue hover:text-accent font-semibold transition-colors"
                    >
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </motion.div>
              </motion.form>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;