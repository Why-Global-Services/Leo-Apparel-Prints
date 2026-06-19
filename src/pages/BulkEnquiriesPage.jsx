import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const showToast = (message) => {
  alert(message);
};

export default function BulkEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axiosInstance.get("/bulk-enquiries");
      setEnquiries(response.data || []);
    } catch (error) {
      showToast("Failed to fetch bulk enquiries");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
          <h1 className="text-2xl font-bold text-gray-800">Bulk Enquiries</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all custom kit bulk enquiries
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Name</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Requirements</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Design File</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enquiries.length > 0 ? (
                enquiries.map((enq, index) => (
                  <tr key={enq._id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="p-4 text-sm text-gray-600 align-top">
                      {index + 1}
                    </td>
                    <td className="p-4 text-sm text-gray-600 align-top">
                      {new Date(enq.createdAt).toLocaleString('en-US', { 
                        day: '2-digit', month: 'short', year: 'numeric', 
                        hour: 'numeric', minute: '2-digit' 
                      })}
                    </td>
                    <td className="p-4 align-top">
                      <p className="text-sm font-medium text-gray-900">
                        {enq.firstName} {enq.lastName}
                      </p>
                      {enq.isOfferApplied && (
                        <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-green-100 text-green-800 uppercase tracking-wider">
                          🎁 10% OFF APPLIED
                        </span>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      <p className="text-sm text-gray-800 font-medium">{enq.orgName}</p>
                    </td>
                    <td className="p-4 align-top">
                      <p className="text-sm text-gray-600">{enq.email}</p>
                      <p className="text-sm text-gray-600">{enq.phone}</p>
                    </td>
                    <td className="p-4 align-top">
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">For:</span> {enq.uniformFor.join(", ")}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {enq.products.map((p, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {p}
                          </span>
                        ))}
                      </div>
                      {enq.message && (
                        <p className="mt-2 text-xs text-gray-500 max-w-xs truncate" title={enq.message}>
                          "{enq.message}"
                        </p>
                      )}
                    </td>
                    <td className="p-4 align-top text-center">
                      {enq.designFileUrl ? (
                        <a 
                          href={enq.designFileUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          View File
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No File</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-sm text-gray-500">
                    No bulk enquiries found.
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
