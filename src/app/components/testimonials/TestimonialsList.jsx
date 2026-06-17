import React, { useEffect, useState } from 'react';
import axiosClient from "@/lib/axios";
import { Star, BadgeCheck, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const staticTestimonials = [
  { _id: 's1', customerName: 'Michael R.', rating: 5, reviewMessage: "The custom jerseys we ordered for our league were phenomenal. Top notch quality and the turnaround time was surprisingly fast. Highly recommend!", isVerifiedCustomer: true, profileImage: null },
  { _id: 's2', customerName: 'Sarah Jenkins', rating: 5, reviewMessage: "I've tried multiple apparel printers over the years, and this team is by far the best. The colors pop exactly how we wanted and the fabric is incredibly breathable.", isVerifiedCustomer: true, profileImage: null },
  { _id: 's3', customerName: 'David Chen', rating: 4, reviewMessage: "Great customer service! They walked me through the entire design process. The shirts look great, though shipping took one day longer than expected. Will order again.", isVerifiedCustomer: true, profileImage: null },
  { _id: 's4', customerName: 'Emily T.', rating: 5, reviewMessage: "Absolutely obsessed with our new team hoodies. They are so soft, and the print hasn't faded at all after multiple washes. The entire team loves them.", isVerifiedCustomer: true, profileImage: null },
  { _id: 's5', customerName: 'Marcus Johnson', rating: 5, reviewMessage: "Unbeatable prices for the level of quality you get. The stitching is perfect and the material feels premium. They really exceeded my expectations.", isVerifiedCustomer: true, profileImage: null },
  { _id: 's6', customerName: 'Jessica Wong', rating: 5, reviewMessage: "Seamless ordering process! The website's design tool was so easy to use, and the final product looked exactly like the mockup. We are extremely satisfied.", isVerifiedCustomer: true, profileImage: null },
  { _id: 's7', customerName: 'Chris Martinez', rating: 4, reviewMessage: "Very solid work on the bulk order we placed for our company retreat. Everyone loved the fit and finish. Kudos to the support team for their patience.", isVerifiedCustomer: true, profileImage: null },
  { _id: 's8', customerName: 'Amanda L.', rating: 5, reviewMessage: "I was worried about the complex gradient in our logo, but they nailed the print perfectly. It looks incredibly vibrant. Thank you so much!", isVerifiedCustomer: true, profileImage: null },
  { _id: 's9', customerName: 'Brian Foster', rating: 5, reviewMessage: "Best custom athletic wear I've ever purchased. Period. The moisture-wicking tech is legit, and the custom designs hold up perfectly in rough conditions.", isVerifiedCustomer: true, profileImage: null },
  { _id: 's10', customerName: 'Rachel Green', rating: 5, reviewMessage: "A 5-star experience from start to finish. Fast communication, fair pricing, and stunning final products. They have earned a customer for life.", isVerifiedCustomer: true, profileImage: null },
];

export default function TestimonialsList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axiosClient.get('/v1/user/testimonials');
      let approvedTestimonials = response.data?.data || [];
      
      let testimonialsToShow = [...approvedTestimonials];

      if (approvedTestimonials.length < 10) {
        testimonialsToShow = [
          ...approvedTestimonials,
          ...staticTestimonials.slice(0, 10 - approvedTestimonials.length)
        ];
      }
      
      setTestimonials(testimonialsToShow);
    } catch (error) {
      console.error("Failed to fetch testimonials", error);
      // Fallback to static on error
      setTestimonials(staticTestimonials.slice(0, 10));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 animate-pulse h-64">
             <div className="flex items-center space-x-4 mb-4">
               <div className="rounded-full bg-gray-200 h-12 w-12"></div>
               <div className="flex-1 space-y-2">
                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                 <div className="h-3 bg-gray-200 rounded w-1/4"></div>
               </div>
             </div>
             <div className="space-y-3">
               <div className="h-3 bg-gray-200 rounded w-full"></div>
               <div className="h-3 bg-gray-200 rounded w-full"></div>
               <div className="h-3 bg-gray-200 rounded w-3/4"></div>
             </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((test, idx) => (
        <motion.div 
          key={test._id} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all border border-gray-100 relative group flex flex-col h-full"
        >
          <Quote className="absolute top-6 right-6 w-10 h-10 text-gray-100 group-hover:text-primary/10 transition-colors" />
          
          <div className="flex text-yellow-400 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className={i < test.rating ? "fill-yellow-400" : "text-gray-200"} />
            ))}
          </div>

          <p className="text-gray-600 font-secondary leading-relaxed mb-6 flex-grow italic">
            "{test.reviewMessage}"
          </p>

          <div className="flex items-center mt-auto pt-4 border-t border-gray-50">
            {test.profileImage ? (
              <img src={test.profileImage} alt={test.customerName} className="w-12 h-12 rounded-full object-cover mr-4 shadow-sm" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold mr-4 text-lg shadow-sm border border-primary/10">
                {test.customerName.charAt(0).toUpperCase()}
              </div>
            )}
            
            <div>
              <h4 className="font-bold text-gray-900 font-primary flex items-center gap-1">
                {test.customerName}
                {test.isVerifiedCustomer && (
                  <BadgeCheck size={16} className="text-blue-500 ml-1" title="Verified Customer" />
                )}
              </h4>
              <p className="text-xs text-gray-400 font-secondary uppercase tracking-wider mt-0.5">Customer</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
