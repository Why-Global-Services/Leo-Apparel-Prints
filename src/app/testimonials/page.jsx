"use client";

import React, { useState } from 'react';
import TestimonialsList from '../components/testimonials/TestimonialsList';
import TestimonialForm from '../components/testimonials/TestimonialForm';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function TestimonialsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 font-primary mb-4"
          >
            Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Stories</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 font-secondary mb-8"
          >
            Don't just take our word for it. Read what our satisfied customers have to say about their custom apparel experience with Leo Cult.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsModalOpen(true)}
            className="btn btn-gradient btn-md btn-shine inline-flex cursor-pointer"
          >
            Drop Testimonial
            <svg
              className="w-4 h-4 transition-all duration-300 group-hover:translate-x-2"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2 7h10M8 3.5L11.5 7 8 10.5"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>

        {/* Full Width Layout: List */}
        <div className="w-full space-y-8">
          <TestimonialsList />
        </div>
      </div>

      {/* Modal for Submission Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors z-10"
              >
                <X size={20} />
              </button>
              <div className="p-2">
                <TestimonialForm onClose={() => setIsModalOpen(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
