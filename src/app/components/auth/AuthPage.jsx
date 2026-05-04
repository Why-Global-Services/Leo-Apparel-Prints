"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "@/features/auth/authThunks";

export default function AuthPage({ defaultMode = "login" }) {
  const [mode, setMode] = useState(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [windowHeight, setWindowHeight] = useState(800);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "",
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    console.log("Form Data:", form);
    const res = await dispatch(
      loginUser({
        phone: form.phone,
        password: form.password,
      })
    );
    console.log("Login Response:", res);
    if (res.meta.requestStatus === "fulfilled") {
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  useEffect(() => {
    if (!mounted) return;
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted]);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024 && windowWidth > 768;
  const showLeftPanel = !isMobile && !isTablet;

  const getResponsiveStyles = () => {
    return {
      root: {
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#060e1f",
        fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
      },
      right: {
        width: "100%",
        position: "relative",
        background: "#060e1f",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "16px" : isTablet ? "24px" : "48px",
      },
      rightContent: {
        width: "100%",
        maxWidth: isMobile ? "100%" : isTablet ? "500px" : "480px",
        margin: "0 auto",
      },
      formTitle: {
        fontFamily: "'Barlow Condensed', 'Arial Black', sans-serif",
        fontWeight: 900,
        fontSize: isMobile ? "26px" : isTablet ? "30px" : "32px",
        letterSpacing: isMobile ? "2px" : isTablet ? "3px" : "4px",
        color: "#E2E8F0",
        lineHeight: 1.2,
        marginBottom: "8px",
        textTransform: "uppercase",
        textAlign: "center",
      },
      formSub: {
        fontSize: isMobile ? "11px" : "12px",
        color: "rgba(226,232,240,0.5)",
        letterSpacing: "0.5px",
        marginBottom: isMobile ? "24px" : "28px",
        fontFamily: "'Barlow Condensed', sans-serif",
        textAlign: "center",
      },
      input: {
        width: "100%",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "10px",
        padding: isMobile ? "10px 38px 10px 38px" : "11px 40px 11px 40px",
        color: "#E2E8F0",
        fontSize: isMobile ? "13px" : "14px",
        fontFamily: "'Barlow Condensed', sans-serif",
        letterSpacing: "0.5px",
        outline: "none",
        transition: "all 0.2s",
        boxSizing: "border-box",
      },
      submitBtn: {
        width: "100%",
        padding: isMobile ? "12px" : "13px",
        background: "linear-gradient(135deg, #0EA5E9, #0284C7, #1E3A8A)",
        border: "none",
        borderRadius: "10px",
        color: "#fff",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        fontSize: isMobile ? "14px" : "15px",
        letterSpacing: isMobile ? "3px" : "4px",
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: "0 4px 20px rgba(14,165,233,0.3)",
        textTransform: "uppercase",
        marginTop: "8px",
      },
      tab: {
        flex: 1,
        padding: isMobile ? "10px 0" : "12px 0",
        background: "transparent",
        border: "none",
        borderBottom: "2px solid transparent",
        marginBottom: "-2px",
        color: "rgba(226,232,240,0.4)",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        fontSize: isMobile ? "14px" : "15px",
        letterSpacing: isMobile ? "2px" : "3px",
        cursor: "pointer",
        transition: "all 0.2s",
        textTransform: "uppercase",
      },
      twoCol: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: isMobile ? "10px" : "12px",
      },
      tabRow: {
        display: "flex",
        gap: 0,
        marginBottom: isMobile ? "28px" : "32px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      },
      brandHeader: {
        textAlign: "center",
        marginBottom: isMobile ? "20px" : "28px",
      },
      brandLogo: {
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 900,
        fontSize: isMobile ? "28px" : "32px",
        letterSpacing: isMobile ? "4px" : "6px",
        background: "linear-gradient(135deg, #F5B800, #E8960A)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textTransform: "uppercase",
      },
      brandStar: {
        fontSize: isMobile ? "20px" : "24px",
        color: "#F5B800",
      },
      fieldLabel: {
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        fontSize: isMobile ? "10px" : "11px",
        letterSpacing: "2px",
        color: "rgba(226,232,240,0.5)",
        marginBottom: "6px",
        textTransform: "uppercase",
      },
      forgotLink: {
        fontSize: isMobile ? "11px" : "12px",
        color: "#0EA5E9",
        cursor: "pointer",
        fontFamily: "'Barlow Condensed', sans-serif",
        letterSpacing: "0.5px",
      },
      switchText: {
        fontSize: isMobile ? "11px" : "12px",
        color: "rgba(226,232,240,0.5)",
        fontFamily: "'Barlow Condensed', sans-serif",
      },
      switchLink: {
        fontSize: isMobile ? "11px" : "12px",
        color: "#F5B800",
        cursor: "pointer",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        letterSpacing: "0.5px",
      },
      promoLine: {
        textAlign: "center",
        marginTop: "14px",
        fontSize: isMobile ? "10px" : "11px",
        color: "rgba(226,232,240,0.35)",
        fontFamily: "'Barlow Condensed', sans-serif",
        letterSpacing: "0.3px",
      },
      checkLabel: {
        fontSize: isMobile ? "10px" : "11px",
        color: "rgba(226,232,240,0.5)",
        fontFamily: "'Barlow Condensed', sans-serif",
        lineHeight: 1.4,
        cursor: "pointer",
      },
    };
  };

  const responsiveStyles = getResponsiveStyles();

  if (!mounted) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        background: "#060e1f",
        color: "white"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={responsiveStyles.root}>
      {/* Left Panel - Desktop only */}
      {showLeftPanel && (
        <div style={styles.left}>
          <div style={{ ...styles.geo, ...styles.geo1 }} />
          <div style={{ ...styles.geo, ...styles.geo2 }} />
          <div style={{ ...styles.geo, ...styles.geo3 }} />
          <div style={{ ...styles.geo, ...styles.geo4 }} />
          <div style={{ ...styles.tri, ...styles.tri1 }} />
          <div style={{ ...styles.tri, ...styles.tri2 }} />
          <div style={{ ...styles.tri, ...styles.tri3 }} />

          <div style={styles.leftBrand}>
            <span style={styles.brandStar}>✦</span>
            <span className="leoGradient" style={styles.brandText}>LEO CULT</span>
          </div>

          <div style={styles.figureWrap}>
            <div style={styles.glowEffect} />
            <Image
              src="/images/icons/login.png"
              alt="LEO CULT Jersey"
              width={380}
              height={530}
              style={styles.jerseyImage}
              priority
              loading="eager"
              onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = "paused"; }}
              onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = "running"; }}
            />
            <div style={styles.backgroundText}>LEO CULT</div>
          </div>

          <div style={styles.leftFooter}>
            <span style={styles.footerDot} />
            Custom Jerseys &amp; Uniforms &nbsp;·&nbsp; Bulk Orders
            <span style={styles.footerDot} />
          </div>
        </div>
      )}

      {/* Right Panel - Form */}
      <div style={responsiveStyles.right}>
        <div style={responsiveStyles.rightContent}>
          {/* Mobile/Tablet Brand Header */}
          {(isMobile || isTablet) && (
            <div style={responsiveStyles.brandHeader}>
              <span style={responsiveStyles.brandStar}>✦</span>
              <div style={responsiveStyles.brandLogo}>LEO CULT</div>
            </div>
          )}

          <div style={responsiveStyles.tabRow}>
            <button
              style={{ ...responsiveStyles.tab, ...(mode === "login" ? styles.tabActive : {}) }}
              onClick={() => {
                setMode("login");
                router.push("/auth/login");
              }}
            >
              LOGIN
            </button>
            <button
              style={{ ...responsiveStyles.tab, ...(mode === "register" ? styles.tabActive : {}) }}
              onClick={() => {
                setMode("register");
                router.push("/auth/register");
              }}
            >
              REGISTER
            </button>
          </div>

          {mode === "login" && (
            <div>
              <div style={responsiveStyles.formTitle}>WELCOME BACK</div>
              <div style={responsiveStyles.formSub}>Sign in to manage your jersey orders</div>

              <div style={responsiveStyles.fieldLabel}>EMAIL ADDRESS</div>
              <InputField
                icon={<EmailIcon />}
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handle}
                responsiveStyles={responsiveStyles}
              />

              <div style={responsiveStyles.fieldLabel}>PASSWORD</div>
              <PasswordField
                icon={<LockIcon />}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handle}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                responsiveStyles={responsiveStyles}
              />

              <div style={styles.forgotRow}>
                <span style={responsiveStyles.forgotLink}>Forgot password?</span>
              </div>

              <SubmitButton label="SIGN IN" responsiveStyles={responsiveStyles} onClick={handleLogin}/>

              <div style={styles.switchRow}>
                <span style={responsiveStyles.switchText}>Don't have an account? </span>
                <span style={responsiveStyles.switchLink} onClick={() => {
                  setMode("register");
                  router.push("/auth/register");
                }}>
                  Register here!
                </span>
              </div>

              <div style={responsiveStyles.promoLine}>
                ⚡ Play and win exciting prizes — absolutely free!
              </div>
            </div>
          )}

          {mode === "register" && (
            <div>
              <div style={responsiveStyles.formTitle}>CREATE ACCOUNT</div>
              <div style={responsiveStyles.formSub}>Join for exclusive offers & member pricing</div>

              <div style={responsiveStyles.twoCol}>
                <div>
                  <div style={responsiveStyles.fieldLabel}>FIRST NAME</div>
                  <InputField
                    icon={<UserIcon />}
                    name="firstName"
                    type="text"
                    placeholder="Rahul"
                    value={form.firstName}
                    onChange={handle}
                    responsiveStyles={responsiveStyles}
                  />
                </div>
                <div>
                  <div style={responsiveStyles.fieldLabel}>LAST NAME</div>
                  <InputField
                    icon={<UserIcon />}
                    name="lastName"
                    type="text"
                    placeholder="Kumar"
                    value={form.lastName}
                    onChange={handle}
                    responsiveStyles={responsiveStyles}
                  />
                </div>
              </div>

              <div style={responsiveStyles.fieldLabel}>EMAIL ADDRESS</div>
              <InputField
                icon={<EmailIcon />}
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handle}
                responsiveStyles={responsiveStyles}
              />

              <div style={responsiveStyles.twoCol}>
                <div>
                  <div style={responsiveStyles.fieldLabel}>PHONE NUMBER</div>
                  <InputField
                    icon={<PhoneIcon />}
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handle}
                    responsiveStyles={responsiveStyles}
                  />
                </div>
                <div>
                  <div style={responsiveStyles.fieldLabel}>PASSWORD</div>
                  <PasswordField
                    icon={<LockIcon />}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handle}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    responsiveStyles={responsiveStyles}
                  />
                </div>
              </div>

              <div style={styles.checkRow}>
                <input type="checkbox" id="terms" style={styles.checkbox} />
                <label htmlFor="terms" style={responsiveStyles.checkLabel}>
                  I agree to the{" "}
                  <span style={responsiveStyles.switchLink}>Terms</span> and{" "}
                  <span style={responsiveStyles.switchLink}>Privacy</span>
                </label>
              </div>

              <SubmitButton label="CREATE ACCOUNT" responsiveStyles={responsiveStyles} />

              <div style={styles.switchRow}>
                <span style={responsiveStyles.switchText}>Already have an account? </span>
                <span style={responsiveStyles.switchLink} onClick={() => {
                  setMode("login");
                  router.push("/");
                }}>
                  Sign in here!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes autoRotateSlow {
          0%, 100% { transform: rotateY(0deg) translateY(0px); }
          50% { transform: rotateY(8deg) translateY(-8px); }
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
        }
        
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(14,165,233,0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(14,165,233,0.7);
        }
        
        @media (max-width: 768px) {
          ::-webkit-scrollbar {
            width: 3px;
          }
        }
      `}</style>
    </div>
  );
}

// Sub-components
function InputField({ icon, name, type, placeholder, value, onChange, responsiveStyles }) {
  return (
    <div style={styles.inputWrap}>
      <span style={styles.inputIcon}>{icon}</span>
      <input
        style={responsiveStyles.input}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          e.target.style.borderColor = "#0EA5E9";
          e.target.style.background = "rgba(14,165,233,0.07)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(255,255,255,0.09)";
          e.target.style.background = "rgba(255,255,255,0.04)";
        }}
      />
    </div>
  );
}

function PasswordField({ icon, name, placeholder, value, onChange, showPassword, setShowPassword, responsiveStyles }) {
  return (
    <div style={styles.inputWrap}>
      <span style={styles.inputIcon}>{icon}</span>
      <input
        style={responsiveStyles.input}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          e.target.style.borderColor = "#0EA5E9";
          e.target.style.background = "rgba(14,165,233,0.07)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(255,255,255,0.09)";
          e.target.style.background = "rgba(255,255,255,0.04)";
        }}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        style={styles.eyeButton}
      >
        {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </button>
    </div>
  );
}

function SubmitButton({ label, responsiveStyles, onClick }) {
  return (
    <button
      style={responsiveStyles.submitBtn}
      onClick={onClick} 
      type="button"
      onMouseEnter={(e) => { e.target.style.opacity = "0.88"; e.target.style.transform = "translateY(-1px)"; }}
      onMouseLeave={(e) => { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; }}
    >
      {label}
    </button>
  );
}

// Icons
const EyeOpenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 0 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2">
    <circle cx="12" cy="7" r="4" />
    <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.09 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Styles
const styles = {
  left: {
    position: "relative",
    width: "50%",
    flexShrink: 0,
    overflow: "hidden",
    background: "linear-gradient(145deg, #09185b 0%, #0B3C6D 45%, #1E3A8A 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  geo: { position: "absolute", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
  geo1: { width: 380, height: 380, background: "rgba(245,184,0,0.10)", top: -130, left: -130 },
  geo2: { width: 240, height: 240, background: "rgba(14,165,233,0.14)", top: "35%", left: -70 },
  geo3: { width: 160, height: 160, background: "rgba(245,184,0,0.08)", bottom: 60, right: -40 },
  geo4: { width: 100, height: 100, background: "rgba(14,165,233,0.1)", top: 80, right: 60 },
  tri: { position: "absolute", width: 0, height: 0 },
  tri1: { borderLeft: "140px solid transparent", borderRight: "140px solid transparent", borderBottom: "240px solid rgba(245,184,0,0.12)", bottom: 0, left: -30 },
  tri2: { borderLeft: "100px solid transparent", borderRight: "100px solid transparent", borderBottom: "180px solid rgba(14,165,233,0.16)", bottom: 0, left: 120 },
  tri3: { borderLeft: "70px solid transparent", borderRight: "70px solid transparent", borderBottom: "130px solid rgba(245,184,0,0.08)", bottom: 0, left: 260 },
  leftBrand: { position: "absolute", top: 24, right: 28, display: "flex", alignItems: "center", gap: 8, zIndex: 10 },
  brandStar: { color: "#F5B800", fontSize: 16 },
  brandText: { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: 5, color: "#ffffff", textTransform: "uppercase" },
  figureWrap: { position: "relative", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  glowEffect: { position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.35), transparent)", filter: "blur(60px)", zIndex: 0 },
  jerseyImage: { objectFit: "contain", filter: "drop-shadow(0 20px 60px rgba(14,165,233,0.5))", animation: "autoRotateSlow 6s ease-in-out infinite", transformStyle: "preserve-3d", width: 380, height: 530 },
  backgroundText: { position: "absolute", fontSize: 70, fontWeight: 900, letterSpacing: 12, color: "rgba(255,255,255,0.04)", textTransform: "uppercase", zIndex: 1, whiteSpace: "nowrap" },
  leftFooter: { position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, letterSpacing: 2, color: "rgba(226,232,240,0.4)", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, zIndex: 5 },
  footerDot: { display: "inline-block", width: 4, height: 4, borderRadius: "50%", background: "#F5B800", opacity: 0.6 },
  tabActive: { color: "#F5B800", borderBottomColor: "#F5B800" },
  inputWrap: { position: "relative", marginBottom: 16, display: "flex", alignItems: "center", width: "100%" },
  inputIcon: { position: "absolute", left: 14, display: "flex", alignItems: "center", pointerEvents: "none", zIndex: 1 },
  eyeButton: { position: "absolute", right: 14, background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0, zIndex: 1 },
  forgotRow: { display: "flex", justifyContent: "flex-end", marginBottom: 20, marginTop: 4 },
  switchRow: { textAlign: "center", marginTop: 20 },
  checkRow: { display: "flex", alignItems: "flex-start", gap: 10, margin: "16px 0 20px" },
  checkbox: { accentColor: "#0EA5E9", width: 14, height: 14, marginTop: 2, flexShrink: 0 },
};