"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Plus, Home, Building, MapPin, Truck, ShoppingBag,
  CreditCard, Shield, Check, ChevronRight, X
} from "lucide-react";
import { getCheckout, placeOrder } from "@/features/checkout/checkoutThunks";
import { fetchAddresses, addAddress, updateAddress } from "@/features/user/userThunks";
import AddAddressModal from "../account/components/AddAddressModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import axiosClient from "../../lib/axios"

const C = {
  blue: "#003E9B",
  blueDark: "#002a6e",
  blueLight: "#e6f0ff",
  white: "#ffffff",
  pageBg: "#f1f5f9",
  cardBorder: "#e5e7eb",
  textDark: "#111827",
  textMid: "#4b5563",
  textLight: "#6b7280",
  textMuted: "#9ca3af",
  green: "#10b981",
  greenBg: "#ecfdf5",
  greenBorder: "#a7f3d0",
  yellowBg: "#fffbeb",
  yellowBorder: "#fde68a",
  yellowText: "#92400e",
};

const TYPE_ICONS = { HOME: Home, OFFICE: Building };
const TYPE_LABELS = { HOME: "Home", OFFICE: "Office" };

function GradientButton({ onClick, disabled = false, children, fullWidth = false, style = {} }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: `linear-gradient(135deg, ${C.blue}, #0052cc, ${C.blueDark})`,
        color: "#fff",
        border: "none",
        borderRadius: 12,
        padding: "10px 18px",
        fontSize: 13,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        position: "relative",
        overflow: "hidden",
        transform: hover && !disabled ? "translateY(-2px)" : "none",
        boxShadow: hover && !disabled ? "0 8px 20px rgba(0,62,155,0.35)" : "0 2px 8px rgba(0,0,0,0.12)",
        transition: "all 0.25s ease",
        width: fullWidth ? "100%" : undefined,
        fontFamily: "var(--font-poppins), Poppins, sans-serif",
        ...style,
      }}
    >
      <span style={{
        position: "absolute", top: 0,
        left: hover ? "110%" : "-110%",
        width: "55%", height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
        transition: "left 0.45s ease",
        pointerEvents: "none",
      }} />
      {children}
    </button>
  );
}

function AddressCard({ address, selected, onSelect }) {
  const [hover, setHover] = useState(false);
  const TypeIcon = TYPE_ICONS[address.addressType] || Home;

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: C.white,
        border: selected ? `2px solid ${C.blue}` : `1px solid ${hover ? "#94a3b8" : C.cardBorder}`,
        borderLeft: address.isPrimary ? `4px solid ${C.blue}` : selected ? `2px solid ${C.blue}` : `1px solid ${hover ? "#94a3b8" : C.cardBorder}`,
        borderRadius: 14,
        padding: 18,
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: hover ? "0 4px 14px rgba(0,0,0,0.07)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.textDark, margin: 0 }}>{address.fullName}</p>
            {address.isPrimary && (
              <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", background: C.blueLight, color: C.blue, borderRadius: 99 }}>Primary</span>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <p style={{ fontSize: 13, color: C.textMid, margin: 0 }}>{address.addressLine1}</p>
            {address.landMark && <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>Landmark: {address.landMark}</p>}
            <p style={{ fontSize: 13, color: C.textMid, margin: 0 }}>{address.city}, {address.state} {address.zipCode}</p>
            <p style={{ fontSize: 13, color: C.textMid, margin: 0 }}>{address.country}</p>
            <p style={{ fontSize: 13, color: C.textMid, margin: 0 }}>Phone: {address.phone}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, paddingTop: 10, borderTop: "1px solid #f1f5f9" }}>
            <TypeIcon size={12} color={C.blue} />
            <span style={{ fontSize: 12, fontWeight: 700, color: C.blue }}>{TYPE_LABELS[address.addressType] || address.addressType}</span>
          </div>
        </div>
        {selected && (
          <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginLeft: 12, background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Check size={13} color="#fff" />
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyPlaceholder({ label, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%", padding: "40px 20px",
        border: "none",
        outline: `2px dashed ${hover ? C.blue : "#d1d5db"}`,
        borderRadius: 14,
        background: hover ? "#f0f5ff" : "transparent",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        cursor: "pointer", transition: "all 0.2s ease",
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", transform: hover ? "scale(1.1)" : "scale(1)" }}>
        <Plus size={20} color="#9ca3af" />
      </div>
      <span style={{ fontSize: 14, fontWeight: 500, color: "#6b7280" }}>{label}</span>
    </button>
  );
}

function ToggleSwitch({ checked, onChange, labelOn, labelOff }) {
  return (
    <button onClick={onChange} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}>
      <div style={{ width: 44, height: 24, borderRadius: 12, background: checked ? `linear-gradient(135deg, ${C.blue}, ${C.blueDark})` : "#d1d5db", position: "relative", transition: "background 0.3s ease", flexShrink: 0 }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.white, position: "absolute", top: 3, left: checked ? 23 : 3, transition: "left 0.3s ease", boxShadow: "0 1px 4px rgba(0,0,0,0.25)" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: checked ? C.blue : "#6b7280" }}>{checked ? labelOn : labelOff}</span>
    </button>
  );
}

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [addressMode, setAddressMode] = useState("billing");
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [useSameAsBilling, setUseSameAsBilling] = useState(true);
  const [showDeliveryList, setShowDeliveryList] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("RazorPay");
  const [deliveryDays, setDeliveryDays] = useState(10);

  // Get data from Redux
  const user = useSelector((state) => state.auth?.user);
  const { checkoutData, loading: checkoutLoading, error: checkoutError } = useSelector((state) => state.checkout);
  const addressesRedux = useSelector((state) => state.user?.addresses?.address || []);

  // Get cart items from checkout data or direct from cart
  const cartItems = checkoutData?.cartItems || [];
  const summary = checkoutData?.pricing || { subtotal: 0, shipping: 0, total: 0, savings: 0 };


  const safeAddresses = Array.isArray(addressesRedux) && addressesRedux.length > 0 ? addressesRedux : (Array.isArray(user?.address) ? user.address : []);
  const billingAddresses = safeAddresses.filter(a => a?.checkoutAddress === "billingAddress");
  const deliveryAddresses = safeAddresses.filter(a => a?.checkoutAddress === "deliveryAddress");
  const primaryBilling = billingAddresses.find(a => a?.isPrimary) || billingAddresses[0];
  const primaryDelivery = deliveryAddresses.find(a => a?.isPrimary) || deliveryAddresses[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load checkout data on mount
  useEffect(() => {
    const loadCheckout = async () => {
      try {
        setLoading(true);
        await dispatch(getCheckout()).unwrap();
        await dispatch(fetchAddresses()).unwrap();
      } catch (error) {
        console.error("Error loading checkout:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCheckout();
  }, [dispatch]);


  useEffect(() => {

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };

  }, []);

  useEffect(() => {
    if (primaryBilling && !selectedBilling) {
      setSelectedBilling(primaryBilling);
      if (useSameAsBilling) setSelectedDelivery(primaryBilling);
    }
  }, [primaryBilling]);

  const openModal = (mode) => {
    setAddressMode(mode);
    setEditAddress(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditAddress(null);
  };

  const handleAddAddress = async (formData) => {
    const addressData = {
      formattedData: {
        fullName: formData.fullName,
        addressLine1: formData.addressLine1,
        landMark: formData.landMark || "",
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone,
        addressType: formData.addressType || "HOME",
        checkoutAddress: addressMode === "billing" ? "billingAddress" : "deliveryAddress",
        isPrimary: formData.isPrimary || false,
      }
    };

    setLoading(true);
    try {
      if (editAddress) {
        await dispatch(updateAddress({
          addressId: editAddress._id,
          data: addressData
        })).unwrap();
      } else {
        await dispatch(addAddress(addressData)).unwrap();
      }
      setEditAddress(null);
      setIsModalOpen(false);
      await dispatch(fetchAddresses()).unwrap();
      await dispatch(getCheckout()).unwrap();
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBilling = (addr) => {
    setSelectedBilling(addr);
    if (useSameAsBilling) setSelectedDelivery(addr);
  };

  const handleSelectDelivery = (addr) => {
    setSelectedDelivery(addr);
    setShowDeliveryList(false);
  };

  const handleToggle = () => {
    const next = !useSameAsBilling;
    setUseSameAsBilling(next);
    setSelectedDelivery(next ? selectedBilling : (primaryDelivery || null));
  };

  const handlePlaceOrder = async () => {
    if (!selectedBilling) {
      alert("Please select a billing address");
      return;
    }
    if (!useSameAsBilling && !selectedDelivery) {
      alert("Please select a delivery address");
      return;
    }

    const orderData = {
      billingAddress: selectedBilling,
      deliveryAddress: useSameAsBilling ? selectedBilling : selectedDelivery,
      paymentMethod,
      totalAmount: summary.total,
      deliveryDays: Number(deliveryDays) || 0,
    };

    try {
      if (!window.Razorpay) {
        toast.error("Payment gateway is still loading. Please try again.");
        return;
      }

      console.log("ORDER DATA:", orderData);

      const result = await dispatch(placeOrder(orderData)).unwrap();

      console.log("ORDER RESULT:", result);

      const razorpayOrder =
        result?.data?.razorpayOrder ||
        result?.razorpayOrder;

      const userOrder = result?.data?.userOrder || result?.userOrder; console.log("USER ORDER:", userOrder);

      console.log("USER ORDER:", userOrder);

      if (!razorpayOrder) {
        alert("Razorpay order not found");
        return;
      }

      const options = {

        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,

        name: "Leo Cult",

        description: "Custom Sports Wear",

        order_id: razorpayOrder.id,

        handler: async function (response) {

          console.log("PAYMENT SUCCESS:", response);

          try {

            const token = localStorage.getItem("token");

            const verifyRes = await axios.post(

              `${process.env.NEXT_PUBLIC_API_URL}/v1/user/verifyPayment/${userOrder._id}`,

              {
                response,
              },

              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }

            );

            console.log("VERIFY RESPONSE:", verifyRes.data);
            await axiosClient.put(`/v1/user/editOrders/${userOrder.orderId}`,{status:"Ordered"})
            toast.success("Payment Successful!");

          } catch (err) {

            console.error("VERIFY ERROR:", err.response?.data || err);

            toast.error("Payment verification failed");

          }
        },

        modal: {
          ondismiss: function () {

            router.push(
              `/payment-status?status=cancelled&orderId=${(result.data?.userOrder || result.userOrder).orderId}`
            );
          },
        },

        prefill: {
          name: user?.name || "Customer",
          email: user?.email || "",
          contact: user?.phoneNumber || "",
        },

        theme: {
          color: "#003E9B",
        },
      };


      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function (response) {

        console.log("❌ PAYMENT FAILED:", response);

        console.log("❌ ERROR:", response.error);

        alert(response.error.description || "Payment Failed");
      });

      console.log("OPENING RAZORPAY");

      razor.open();

    } catch (error) {
      console.error("PLACE ORDER ERROR:", error);

      alert(error?.message || "Failed to place order");
    }
  };

  if (!mounted || (loading && !checkoutData)) {
    return (
      <div style={{ minHeight: "100vh", background: C.pageBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: C.blue }} />
          <p style={{ marginTop: 8, color: C.textLight, fontSize: 14 }}>Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: C.pageBg, paddingTop: 32, paddingBottom: 48 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
        {/* Page header */}
        <div  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, background: C.white, borderRadius: 14, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: C.blue }}>Checkout</h2>
            <p style={{ fontSize: 13, color: C.textLight, margin: 0 }}>Complete your order</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {["Address", "Payment", "Confirmation"].map((step, i) => (
              <div key={step} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: i === 0 ? `linear-gradient(135deg, ${C.blue}, ${C.blueDark})` : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: i === 0 ? "#fff" : C.textMuted }}>
                    {i === 0 ? <Check size={12} /> : i + 1}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? C.blue : C.textMuted }}>{step}</span>
                </div>
                {i < 2 && <div style={{ width: 32, height: 2, background: "#e5e7eb", margin: "0 8px" }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                background: C.white,
                borderRadius: 14,
                border: `1px solid ${C.cardBorder}`,
                padding: 20,
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  color: C.textDark,
                  marginBottom: 8,
                }}
              >
                Estimated Delivery Time
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: `1px solid ${C.cardBorder}`,
                  borderRadius: 10,
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="Enter days"
                  value={deliveryDays}
                  onChange={(e) => setDeliveryDays(e.target.value)}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    padding: "12px 14px",
                    fontSize: 14,
                    color: C.textDark,
                    background: "transparent",
                  }}
                />

                <div
                  style={{
                    padding: "12px 16px",
                    background: "#f8fafc",
                    borderLeft: `1px solid ${C.cardBorder}`,
                    fontSize: 13,
                    fontWeight: 600,
                    color: C.textLight,
                  }}
                >
                  Days
                </div>
              </div>

              <p
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: C.textLight,
                }}
              >
                Enter the estimated number of days required for delivery.
              </p>
            </div>
            {/* BILLING ADDRESS */}
            <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.cardBorder}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${C.cardBorder}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <MapPin size={16} color={C.blue} />
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: C.textDark, margin: 0 }}>Billing Address</h3>
                    <p style={{ fontSize: 12, color: C.textLight, margin: 0 }}>Where should we send the invoice?</p>
                  </div>
                </div>
                <GradientButton onClick={() => openModal("billing")} style={{ padding: "8px 14px", fontSize: 12 }}>
                  <Plus size={13} /> Add New
                </GradientButton>
              </div>
              <div style={{ padding: 20 }}>
                {billingAddresses.length > 0 ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {billingAddresses.map(addr => <AddressCard key={addr._id} address={addr} selected={selectedBilling?._id === addr._id} onSelect={() => handleSelectBilling(addr)} />)}
                  </div>
                ) : (
                  <EmptyPlaceholder label="Add Billing Address" onClick={() => openModal("billing")} />
                )}
              </div>
            </div>

            {/* DELIVERY ADDRESS */}
            <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.cardBorder}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${C.cardBorder}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Truck size={16} color={C.blue} />
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: C.textDark, margin: 0 }}>Delivery Address</h3>
                    <p style={{ fontSize: 12, color: C.textLight, margin: 0 }}>Where should we ship your order?</p>
                  </div>
                </div>
                {selectedBilling && <ToggleSwitch checked={useSameAsBilling} onChange={handleToggle} labelOn="Same as billing" labelOff="Different address" />}
              </div>
              <div style={{ padding: 20 }}>
                {!selectedBilling ? (
                  <div style={{ padding: 16, background: C.yellowBg, borderRadius: 12, border: `1px solid ${C.yellowBorder}` }}>
                    <p style={{ fontSize: 13, color: C.yellowText, margin: 0 }}>Please select a billing address first</p>
                  </div>
                ) : useSameAsBilling ? (
                  <div style={{ padding: 16, background: C.greenBg, borderRadius: 12, border: `1px solid ${C.greenBorder}`, display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Check size={14} color="#fff" />
                    </div>
                    <div>
                      <p style={{ fontSize: 12, color: "#065f46", fontWeight: 700, margin: "0 0 6px" }}>Delivering to billing address</p>
                      <p style={{ fontSize: 14, fontWeight: 700, color: C.textDark, margin: "0 0 2px" }}>{selectedBilling.fullName}</p>
                      <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 2px" }}>{selectedBilling.addressLine1}</p>
                      <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 2px" }}>{selectedBilling.city}, {selectedBilling.state} {selectedBilling.zipCode}</p>
                      <p style={{ fontSize: 12, color: C.textLight, margin: 0 }}>Phone: {selectedBilling.phone}</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {deliveryAddresses.length > 0 ? (
                      <>
                        {!showDeliveryList ? (
                          <div onClick={() => setShowDeliveryList(true)} style={{ padding: 16, background: "#f8fafc", borderRadius: 12, border: `1px solid ${C.cardBorder}`, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <p style={{ fontSize: 12, color: C.textLight, margin: "0 0 4px" }}>Selected delivery address</p>
                              {selectedDelivery ? (
                                <>
                                  <p style={{ fontSize: 14, fontWeight: 700, color: C.textDark, margin: "0 0 2px" }}>{selectedDelivery.fullName}</p>
                                  <p style={{ fontSize: 13, color: C.textMid, margin: 0 }}>{selectedDelivery.addressLine1}, {selectedDelivery.city}</p>
                                </>
                              ) : (
                                <p style={{ fontSize: 14, color: C.blue, fontWeight: 700, margin: 0 }}>Choose a delivery address →</p>
                              )}
                            </div>
                            <ChevronRight size={18} color={C.textMuted} />
                          </div>
                        ) : (
                          <>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <p style={{ fontSize: 13, fontWeight: 700, color: C.textDark, margin: 0 }}>Select delivery address</p>
                              <button onClick={() => setShowDeliveryList(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                                <X size={16} color={C.textLight} />
                              </button>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                              {deliveryAddresses.map(addr => <AddressCard key={addr._id} address={addr} selected={selectedDelivery?._id === addr._id} onSelect={() => handleSelectDelivery(addr)} />)}
                            </div>
                          </>
                        )}
                        <GradientButton onClick={() => openModal("delivery")} style={{ alignSelf: "flex-start" }}>
                          <Plus size={14} /> Add New Delivery Address
                        </GradientButton>
                      </>
                    ) : (
                      <EmptyPlaceholder label="Add Delivery Address" onClick={() => openModal("delivery")} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Order Summary */}
          <div style={{ position: "sticky", top: 24 }}>
            <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.cardBorder}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`, display: "flex", alignItems: "center", gap: 10 }}>
                <ShoppingBag size={17} color="rgba(255,255,255,0.9)" />
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: 0 }}>Order Summary</h2>
              </div>
              <div style={{ padding: 20 }}>
                {/* Cart items */}
                {/* Cart items */}
                <div style={{ maxHeight: 320, overflowY: "auto", marginBottom: 16 }}>
                  {cartItems.length > 0 ? (
                    cartItems.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "10px 0",
                          borderBottom: `1px dashed ${C.cardBorder}`,
                        }}
                      >
                        {/* Product Image */}
                        <img
                          src={
                            item.productImages?.[0] ||
                            item.productData?.viewImages?.front ||
                            "/placeholder.png"
                          }
                          alt={item.productName}
                          style={{
                            width: 65,
                            height: 65,
                            borderRadius: 10,
                            objectFit: "cover",
                            border: "1px solid #e5e7eb",
                          }}
                        />

                        {/* Product Details */}
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: C.textDark,
                              margin: "0 0 4px",
                            }}
                          >
                            {item.productName}
                          </p>

                          <p
                            style={{
                              fontSize: 12,
                              color: C.textMuted,
                              margin: 0,
                            }}
                          >
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        {/* Price */}
                        <div>
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: C.textDark,
                            }}
                          >
                            ₹{item.subtotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        color: C.textMuted,
                        fontSize: 13,
                        padding: "16px 0",
                      }}
                    >
                      No items in cart
                    </p>
                  )}
                </div>

                {/* Price breakdown */}
                <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: C.textLight }}>Subtotal</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.textDark }}>₹{summary.subtotal?.toLocaleString() || 0}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: C.textLight }}>Shipping</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: summary.shipping === 0 ? C.green : C.textDark }}>
                      {summary.shipping === 0 ? "Free" : `₹${summary.shipping?.toLocaleString() || 0}`}
                    </span>
                  </div>

                </div>

                {/* Total */}
                <div style={{ marginTop: 16, padding: "14px 16px", background: C.blueLight, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.textDark }}>Total</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: C.blue }}>₹{summary.total?.toLocaleString() || 0}</span>
                </div>


                {/* Place Order button */}
                <GradientButton onClick={handlePlaceOrder} disabled={!selectedBilling || cartItems.length === 0} fullWidth style={{ padding: "14px 20px", fontSize: 15, borderRadius: 12, marginTop: 20 }}>
                  Place Order <ChevronRight size={16} />
                </GradientButton>

                {/* Trust strip */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, marginTop: 12 }}>
                  {[{ Icon: Shield, label: "Secure" }, { Icon: CreditCard, label: "All cards" }, { Icon: Check, label: "Guaranteed" }].map(({ Icon, label }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon size={12} color={C.textMuted} />
                      <span style={{ fontSize: 11, color: C.textMuted }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddAddressModal isOpen={isModalOpen} onClose={handleModalClose} onSave={handleAddAddress} initialData={editAddress} mode={addressMode} />
    </div>
  );
}
