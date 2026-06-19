import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const showToast = (message) => {
  alert(message);
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTestimonials();
  }, [filter]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const url = filter === "all" ? "/testimonials" : `/testimonials?status=${filter}`;
      const response = await axiosInstance.get(url);
      setTestimonials(response.data?.data || []);
    } catch (error) {
      showToast("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      if (newStatus === "approved") {
        await axiosInstance.patch(`/testimonials/${id}/approve`);
      } else if (newStatus === "rejected") {
        await axiosInstance.patch(`/testimonials/${id}/reject`);
      }
      fetchTestimonials();
    } catch (error) {
      showToast(`Failed to update status to ${newStatus}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await axiosInstance.delete(`/testimonials/${id}`);
        fetchTestimonials();
      } catch (error) {
        showToast("Failed to delete testimonial");
      }
    }
  };

  if (loading && testimonials.length === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Testimonials Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage customer reviews and testimonials
          </p>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        {["all", "pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium text-sm capitalize ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Review</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {testimonials.length > 0 ? (
                testimonials.map((test, index) => (
                  <tr key={test._id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="p-4 text-sm text-gray-600 align-top whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="p-4 text-sm text-gray-600 align-top whitespace-nowrap">
                      {new Date(test.createdAt).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-3">
                        {test.profileImage ? (
                          <img src={test.profileImage} alt="" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                            {test.customerName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                            {test.customerName}
                            {test.isVerifiedCustomer && (
                              <span title="Verified Customer" className="text-blue-500 text-xs">✔</span>
                            )}
                          </p>
                          {test.email && <p className="text-xs text-gray-500">{test.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex text-yellow-400 text-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < test.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 align-top max-w-xs">
                      <p className="text-sm text-gray-600 line-clamp-3" title={test.reviewMessage}>
                        {test.reviewMessage}
                      </p>
                    </td>
                    <td className="p-4 align-top text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        test.status === "approved" ? "bg-green-100 text-green-800" :
                        test.status === "rejected" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {test.status}
                      </span>
                    </td>
                    <td className="p-4 align-top text-center">
                      <div className="flex items-center justify-center gap-2">
                        {test.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(test._id, "approved")}
                              className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusChange(test._id, "rejected")}
                              className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(test._id)}
                          className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-sm text-gray-500">
                    No testimonials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
