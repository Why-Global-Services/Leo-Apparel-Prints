import React, { useState } from 'react';
import axiosClient from "@/lib/axios";
import { Star, Upload, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    rating: 5,
    reviewMessage: '',
    profileImage: null,
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 5 * 1024 * 1024) {
        if (['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
          setFormData((prev) => ({ ...prev, profileImage: file }));
          setFileName(file.name);
        } else {
          alert('Please upload JPG, PNG, or WEBP images only.');
        }
      } else {
        alert('File size must be less than 5MB.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.reviewMessage || !formData.rating) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append('customerName', formData.customerName);
      if (formData.email) data.append('email', formData.email);
      data.append('rating', formData.rating);
      data.append('reviewMessage', formData.reviewMessage);
      
      // Simple check for verified customer. In a real app, this would be based on backend purchase history.
      const isVerified = localStorage.getItem('token') ? true : false;
      data.append('isVerifiedCustomer', isVerified);

      if (formData.profileImage) {
        data.append('profileImage', formData.profileImage);
      }

      await axiosClient.post('/v1/user/testimonials', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({
        customerName: '', email: '', rating: 5, reviewMessage: '', profileImage: null
      });
      setFileName('');
    } catch (error) {
      alert('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100 h-full flex flex-col justify-center items-center min-h-[400px]">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 font-primary">Review Submitted!</h2>
          <p className="text-gray-500 mt-2 font-secondary">Thank you for your review. It will be displayed after admin approval.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-primary text-center">Leave a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Rating Selector */}
        <div className="flex flex-col items-center justify-center mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-2">How would you rate us?</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  size={32}
                  className={`${
                    star <= (hoveredRating || formData.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              id="customerName"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              placeholder="John Doe"
              value={formData.customerName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="reviewMessage" className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
          <textarea
            id="reviewMessage"
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
            placeholder="Tell us about your experience..."
            value={formData.reviewMessage}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image (Optional)</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-1 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">JPG, PNG, WEBP (MAX. 5MB)</p>
                {fileName && <p className="text-sm font-medium text-primary mt-2">{fileName}</p>}
              </div>
              <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={handleFileChange} />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-xl ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
