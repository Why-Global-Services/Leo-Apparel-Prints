// src/components/layout/TopNav.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { logoutThunk } from "../../store/slices/authSlice";
import {
  IoMenuOutline,
  IoCloseOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";

export default function TopNav({ onMenuClick, mobileOpen, collapsed }){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useSelector((state) => state.auth);

  

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const h = currentTime.getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const formatTime = () => {
    const h = currentTime.getHours();
    const m = String(currentTime.getMinutes()).padStart(2, "0");
    const s = String(currentTime.getSeconds()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = (h % 12) || 12;
    return `${h12}:${m}:${s} ${ampm}`;
  };

  const formatDate = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return `${days[currentTime.getDay()]}, ${months[currentTime.getMonth()]} ${currentTime.getDate()} ${currentTime.getFullYear()}`;
  };

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };

  const sidebarGradient = 'linear-gradient(135deg, #09185b 0%, #0B3C6D 50%, #1E3A8A 100%)';

  return (
    // TopNav.jsx
    // TopNav.jsx - change position to fixed
    <nav style={{
      background: sidebarGradient,
      backdropFilter: 'blur(10px)',
      padding: "0 24px",
      height: "64px",
      position: "fixed",
      top: 0,
      right: 0,
      left: collapsed ? "80px" : "260px",
transition: "all 0.3s ease",
      zIndex: 99,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    }}>
      {/* Left — Menu + Greeting */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={onMenuClick}
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            cursor: "pointer",
            color: "rgba(255,255,255,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
        >
          {mobileOpen ? <IoCloseOutline size={20} /> : <IoMenuOutline size={20} />}
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px"}}>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#fff" }}>
            {getGreeting()}, {user?.email?.split("@")[0] || "Admin"} 👋
          </span>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
            Welcome back
          </span>
        </div>
      </div>

      {/* Right — Clock + Badge + Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

        {/* Live Clock */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
          <span style={{
            fontSize: "18px",
            fontWeight: 500,
            color: "#F5B800",
            fontVariantNumeric: "tabular-nums",
          }}>
            {formatTime()}
          </span>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
            {formatDate()}
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.12)" }} />

        {/* Role Badge */}
        <span style={{
          background: "rgba(245,184,0,0.18)",
          border: "1px solid rgba(245,184,0,0.35)",
          borderRadius: "20px",
          padding: "3px 10px",
          fontSize: "11px",
          color: "#F5B800",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}>
          Administrator
        </span>

        {/* Profile Avatar + Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #F5B800, #E8960A)",
              border: "2px solid rgba(245,184,0,0.4)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              color: "#09185b",
            }}
          >
            {user?.email ? user.email[0].toUpperCase() : "A"}
          </button>

          {showProfileMenu && (
            <>
              <div
                onClick={() => setShowProfileMenu(false)}
                style={{ position: "fixed", inset: 0, zIndex: 98 }}
              />
              <div style={{
                position: "absolute",
                top: "48px",
                right: "0",
                width: "240px",
                background: "#1F2937",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,0.1)",
                zIndex: 99,
                overflow: "hidden",
              }}>
                {/* Profile Header */}
                <div style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <p style={{ color: "#fff", fontSize: "14px", fontWeight: 600, margin: 0 }}>
                    {user?.email || "Admin User"}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginTop: "4px", marginBottom: 0 }}>
                    Administrator
                  </p>
                </div>

                {/* Settings */}
                <button
                  onClick={() => { setShowProfileMenu(false); navigate("/settings"); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                    padding: "12px 16px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.7)",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <IoSettingsOutline size={18} />
                  <span style={{ fontSize: "13px" }}>Settings</span>
                </button>

                {/* Logout */}
                <button
                  onClick={() => { setShowProfileMenu(false); handleLogout(); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                    padding: "12px 16px",
                    background: "transparent",
                    border: "none",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    color: "#EF4444",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <IoLogOutOutline size={18} />
                  <span style={{ fontSize: "13px" }}>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}