// src/components/layout/Sidebar.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { logoutThunk } from "../store/slices/uiSlice";
import {
  IoGridOutline,
  IoPeopleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoBagOutline,
  IoStatsChartOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoReceiptOutline,
} from "react-icons/io5";

export default function Sidebar({ collapsed, setCollapsed }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { path: "/dashboardpage", name: "Dashboard", icon: <IoGridOutline size={20} /> },
    { path: "/category", name: "Category", icon: <IoGridOutline size={20} /> },
    { path: "/designzone", name: "Design Zone", icon: <IoPeopleOutline size={20} /> },
    { path: "/templatezone", name: "Template Zone", icon: <IoBagOutline size={20} /> },
    { path: "/products", name: "Products", icon: <IoReceiptOutline size={20} /> },
    { path: "/pattern", name: "Pattern", icon: <IoStatsChartOutline size={20} /> },
    { path: "/customize", name: "Customization", icon: <IoSettingsOutline size={20} /> },
    { path: "/orderspage", name: "orders", icon: <IoSettingsOutline size={20} /> },
  ];

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };

  const sidebarGradient = 'linear-gradient(135deg, #09185b 0%, #0B3C6D 50%, #1E3A8A 100%)';

  return (
    <div style={{
      width: collapsed ? '80px' : '260px',
      background: sidebarGradient,
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Logo Section */}
      <div style={{
        padding: collapsed ? '20px 0' : '24px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: collapsed ? 'center' : 'left'
      }}>
        {!collapsed ? (
          <>
            <h2 style={{
              background: 'linear-gradient(135deg, #FFF9C4, #F5B800, #E8960A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '4px'
            }}>
              Admin Portal
            </h2>
            <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>
              {user?.email || 'Administrator'}
            </p>
          </>
        ) : (
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #F5B800, #E8960A)',
            borderRadius: '10px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#09185b'
          }}>
            A
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav style={{ flex: 1, padding: '20px 12px' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: collapsed ? '12px' : '12px 16px',
              marginBottom: '8px',
              borderRadius: '12px',
              background: isActive ? 'rgba(245, 184, 0, 0.15)' : 'transparent',
              color: isActive ? '#F5B800' : 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              transition: 'all 0.2s',
              justifyContent: collapsed ? 'center' : 'flex-start',
              border: isActive ? '1px solid rgba(245, 184, 0, 0.3)' : '1px solid transparent'
            })}
          >
            {item.icon}
            {!collapsed && <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div style={{
        padding: '20px 12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '12px',
            width: '100%',
            padding: collapsed ? '12px' : '12px 16px',
            marginBottom: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {collapsed ? <IoChevronForwardOutline size={20} /> : <IoChevronBackOutline size={20} />}
          {!collapsed && <span style={{ fontSize: '13px' }}>Collapse</span>}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '12px',
            width: '100%',
            padding: collapsed ? '12px' : '12px 16px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            color: '#EF4444',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <IoLogOutOutline size={20} />
          {!collapsed && <span style={{ fontSize: '14px', fontWeight: 500 }}>Logout</span>}
        </button>
      </div>
    </div>
  );
}