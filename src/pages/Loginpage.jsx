// src/pages/LoginPage.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../store/slices/authSlice";  // ← Fixed path
import { IoMail, IoLockClosed, IoEye, IoEyeOff } from "react-icons/io5";
// ... rest of your code

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    const result = await dispatch(loginThunk(formData));
    
    if (loginThunk.fulfilled.match(result)) {
      alert("Login successful! Welcome back!");
      navigate("/dashboard");
    } else {
      alert(result.payload || "Login failed. Please check your credentials.");
    }
  };

  const sidebarGradient = 'linear-gradient(135deg, #09185b 0%, #0B3C6D 50%, #1E3A8A 100%)';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: sidebarGradient,
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        padding: '28px 32px',
        width: '100%',
        maxWidth: '380px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #FFF9C4, #F5B800, #E8960A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '6px'
          }}>
            Admin Portal
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
            Sign in to access dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '11px', fontWeight: 500 }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <IoMail size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="admin@example.com"
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#F5B800'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '11px', fontWeight: 500 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <IoLockClosed size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }} />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#F5B800'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.4)'
                }}
              >
                {showPassword ? <IoEyeOff size={14} /> : <IoEye size={14} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              background: 'linear-gradient(135deg, #F5B800, #E8960A)',
              border: 'none',
              borderRadius: '10px',
              color: '#09185b',
              fontSize: '13px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <p style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>Secure admin access • SSL Protected</p>
        </div>
      </div>
    </div>
  );
}