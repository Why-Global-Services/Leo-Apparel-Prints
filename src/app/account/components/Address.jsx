"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Home, Building, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAddresses, addAddress, deleteAddress, updateAddress } from "@/features/user/userThunks";
import AddAddressModal from "./AddAddressModal";

const TYPE_ICONS = { HOME: Home, OFFICE: Building };
const TYPE_LABELS = { HOME: "Home", OFFICE: "Office" };

function AddressCard({ address, onDelete, onEdit }) {
  const TypeIcon = TYPE_ICONS[address.addressType] || Home;

  return (
    <div
      className="rounded-xl p-5 transition-all hover:shadow-md"
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderLeft: address.isPrimary
          ? "3px solid var(--primary-blue)"
          : "1px solid #e5e7eb",
      }}
    >
      <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <p
            className="text-sm font-semibold"
            style={{
              color: "#1f2937",
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
            }}
          >
            {address.fullName}
          </p>
          {address.isPrimary && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "#dbeafe", color: "var(--primary-blue)" }}
            >
              Primary
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(address)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity"
            style={{ background: "#f3f4f6" }}
          >
            <Pencil size={14} style={{ color: "var(--primary-blue)" }} />
          </button>
          <button
            onClick={() => onDelete(address._id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity"
            style={{ background: "#fef2f2" }}
          >
            <Trash2 size={14} style={{ color: "#dc2626" }} />
          </button>
        </div>
      </div>

      <div className="space-y-1 text-sm" style={{ color: "#4b5563" }}>
        <p className="font-semibold" style={{ color: "#1f2937" }}>{address.fullName}</p>
        <p>{address.addressLine1}</p>
        {address.landMark && (
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            Landmark: {address.landMark}
          </p>
        )}
        <p>{address.city}, {address.state} {address.zipCode}</p>
        <p>{address.country}</p>
        <p>Phone: {address.phone}</p>
        <div className="flex items-center gap-1.5 pt-2">
          <TypeIcon size={12} style={{ color: "var(--primary-blue)" }} />
          <span
            className="text-xs font-semibold"
            style={{ color: "var(--primary-blue)" }}
          >
            {TYPE_LABELS[address.addressType] || address.addressType}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Address() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  // ✅ Get addresses from Redux store - this will update when data changes
  const addresses = useSelector((state) => state.user?.addresses?.address || []);
  const user = useSelector((state) => state.auth?.user);

  console.log("address",addresses)
  
  // Fallback to user.address if Redux addresses is empty
  const safeAddresses = Array.isArray(addresses) && addresses.length > 0 
    ? addresses 
    : (user?.address && Array.isArray(user.address) ? user.address : []);
  
  console.log("Addresses in component:", safeAddresses); // Debug log

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        setLoading(true);
        // Always fetch latest addresses
        await dispatch(fetchAddresses()).unwrap();
      } catch (error) {
        console.error("Error loading addresses:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAddresses();
  }, [dispatch]); // Re-fetch when component mounts

  // ✅ Re-fetch addresses after modal closes (when new address is added)
  const refreshAddresses = async () => {
    setLoading(true);
    try {
      await dispatch(fetchAddresses()).unwrap();
    } catch (error) {
      console.error("Error refreshing addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (confirm("Are you sure you want to delete this address?")) {
      try {
        setLoading(true);
        await dispatch(deleteAddress(id)).unwrap();
        await refreshAddresses(); // Refresh after delete
      } catch (error) {
        console.error("Error deleting address:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditAddress = (addr) => {
    setEditAddress(addr);
    setIsModalOpen(true);
  };

  const handleAddAddress = async (formData) => {
    const addressData = {
      formattedData: {
        fullName: formData.fullName,
        addressLine1: formData.addressLine1,
        landMark: formData.landMark,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone,
        addressType: formData.addressType,
        checkoutAddress: formData.checkoutAddress || "deliveryAddress",
      },
    };

    setLoading(true);
    try {
      if (editAddress) {
        await dispatch(updateAddress({
          addressId: editAddress._id,
          data: addressData,
        })).unwrap();
      } else {
        await dispatch(addAddress(addressData)).unwrap();
      }
      
      // Close modal and refresh
      setEditAddress(null);
      setIsModalOpen(false);
      await refreshAddresses(); // ✅ Important: Refresh after add/update
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditAddress(null);
  };

  if (loading && safeAddresses.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-gray-600">Loading addresses...</p>
        </div>
      </div>
    );
  }

  // Filter addresses
  const billingAddresses = safeAddresses.filter(addr => addr.checkoutAddress === "billingAddress");
  const deliveryAddresses = safeAddresses.filter(addr => addr.checkoutAddress === "deliveryAddress");
  const primaryBilling = billingAddresses.find(addr => addr.isPrimary) || billingAddresses[0];
  const primaryDelivery = deliveryAddresses.find(addr => addr.isPrimary) || deliveryAddresses[0];

  console.log("Billing:", billingAddresses); // Debug log
  console.log("Delivery:", deliveryAddresses); // Debug log

  return (
    <div className="max-w-6xl mx-auto px-4">
      <AddAddressModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSave={handleAddAddress}
        initialData={editAddress}
      />

      {/* Section header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-4 border-b" style={{ borderColor: "#e5e7eb" }}>
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold"
            style={{
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
            }}
          >
            <span style={{ color: "var(--primary-blue)" }}>Address </span>
            <span style={{ color: "var(--primary-blue)" }}>Book</span>
          </h2>
          <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
            Manage your billing and delivery addresses
          </p>
        </div>
        
        <button
          onClick={() => {
            setEditAddress(null);
            setIsModalOpen(true);
          }}
          className="btn-gradient btn-shine flex items-center justify-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
          style={{
            fontFamily: "var(--font-poppins), Poppins, sans-serif",
          }}
          disabled={loading}
        >
          <Plus size={16} />
          Add New Address
        </button>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Billing */}
        <div>
          <h3
            className="text-sm font-semibold mb-3 flex items-center gap-2"
            style={{
              color: "#374151",
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
            }}
          >
            <MapPin size={16} style={{ color: "var(--primary-blue)" }} />
            Billing Address
          </h3>
          {loading && billingAddresses.length === 0 ? (
            <div className="text-center py-8">Loading...</div>
          ) : primaryBilling ? (
            <AddressCard 
              address={primaryBilling} 
              onDelete={handleDeleteAddress}
              onEdit={handleEditAddress}
            />
          ) : (
            <button
              onClick={() => {
                setEditAddress(null);
                setIsModalOpen(true);
              }}
              className="w-full rounded-xl p-10 flex flex-col items-center gap-3 transition-all hover:bg-gray-50 group"
              style={{
                border: "2px dashed #d1d5db",
                background: "transparent",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                style={{ background: "#f3f4f6" }}
              >
                <Plus size={20} style={{ color: "#9ca3af" }} />
              </div>
              <span
                className="text-sm font-medium"
                style={{
                  color: "#6b7280",
                  fontFamily: "var(--font-poppins), Poppins, sans-serif",
                }}
              >
                Add Billing Address
              </span>
            </button>
          )}
        </div>

        {/* Delivery */}
        <div>
          <h3
            className="text-sm font-semibold mb-3 flex items-center gap-2"
            style={{
              color: "#374151",
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
            }}
          >
            <MapPin size={16} style={{ color: "var(--primary-blue)" }} />
            Delivery Address
          </h3>
          <div className="flex flex-col gap-4">
            {loading && deliveryAddresses.length === 0 ? (
              <div className="text-center py-8">Loading...</div>
            ) : deliveryAddresses.length > 0 ? (
              deliveryAddresses.map((addr) => (
                <AddressCard
                  key={addr._id}
                  address={addr}
                  onDelete={handleDeleteAddress}
                  onEdit={handleEditAddress}
                />
              ))
            ) : (
              <button
                onClick={() => {
                  setEditAddress(null);
                  setIsModalOpen(true);
                }}
                className="w-full rounded-xl p-10 flex flex-col items-center gap-3 transition-all hover:bg-gray-50 group"
                style={{
                  border: "2px dashed #d1d5db",
                  background: "transparent",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ background: "#f3f4f6" }}
                >
                  <Plus size={20} style={{ color: "#9ca3af" }} />
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: "#6b7280",
                    fontFamily: "var(--font-poppins), Poppins, sans-serif",
                  }}
                >
                  Add Delivery Address
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}