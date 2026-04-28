"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser, getGoogleAuthUrl } from "@/features/auth/authThunks";
import Modal from "../common/Modal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import toast from "react-hot-toast";

export default function AuthModal({ isOpen, onClose, defaultMode = "login" }) {
  const [mode, setMode] = useState(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ── NEW: forgot password state ──────────────────────
  const [showForgotModal, setShowForgotModal] = useState(false);
  // ────────────────────────────────────────────────────

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "",
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    const res = await dispatch(loginUser({ email: form.email, password: form.password }));
   if (res.meta.requestStatus === "fulfilled") {
    toast.success("Login successful");
    onClose();
    router.push("/");
  } else {
    toast.error("Invalid credentials");
  }
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await dispatch(getGoogleAuthUrl()).unwrap();
      window.location.href = result;
    } catch (e) {
      console.error(e);
      toast.error("Failed to initialize Google login.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync defaultMode when prop changes
  useEffect(() => { setMode(defaultMode); }, [defaultMode]);

  const showLeftPanel = windowWidth > 900;
  const isMobile = windowWidth <= 768;

  // ── Forgot password handlers ────────────────────────
  function handleForgotPasswordClick() {
    setShowForgotModal(true); // open forgot modal on top
  }

  function handleForgotModalClose() {
    setShowForgotModal(false);
  }

  function handleBackToLogin() {
    setShowForgotModal(false); // close forgot modal, AuthModal is still open underneath
    setMode("login");
  }
  // ────────────────────────────────────────────────────

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="am-shell">

          {/* ── Close ── */}
          <button className="am-close" onClick={onClose} aria-label="Close">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* ── Left Panel ── */}
          {showLeftPanel && (
            <div className="am-left">
              <div className="am-geo am-geo-1"/><div className="am-geo am-geo-2"/><div className="am-geo am-geo-3"/>
              <div className="am-tri am-tri-1"/><div className="am-tri am-tri-2"/>
              <div className="am-left-brand">
                <span className="am-brand-star">✦</span>
                <span className="am-brand-name">LEO CULT</span>
              </div>
              <div className="am-figure">
                <div className="am-glow"/>
                <Image src="/images/icons/login.png" alt="LEO CULT Jersey" width={260} height={360} className="am-jersey"/>
                <div className="am-bg-text">LEO CULT</div>
              </div>
              <div className="am-left-footer">
                <span className="am-footer-dot"/>Custom Jerseys &amp; Uniforms · Bulk Orders<span className="am-footer-dot"/>
              </div>
            </div>
          )}

          {/* ── Right Panel ── */}
          <div className="am-right">
            <div className="am-right-blob am-right-blob-1"/>
            <div className="am-right-blob am-right-blob-2"/>

            {!showLeftPanel && (
              <div className="am-mobile-brand">
                <span className="am-brand-star-sm">✦</span>
                <span className="am-brand-name-sm">LEO CULT</span>
              </div>
            )}

            {/* Tabs */}
            <div className="am-tabs">
              <button className={`am-tab ${mode === "login" ? "am-tab-active" : ""}`} onClick={() => setMode("login")}>Sign In</button>
              <button className={`am-tab ${mode === "register" ? "am-tab-active" : ""}`} onClick={() => setMode("register")}>Register</button>
            </div>

            {/* ── Login ── */}
            {mode === "login" && (
              <div className="am-form">
                <div className="am-form-head">
                  <h2 className="am-title">Welcome Back</h2>
                  <p className="am-sub">Sign in to manage your jersey orders</p>
                </div>

                <div className="am-input-group">
                  <FloatField label="Email Address" name="email" type="email" value={form.email} onChange={handle} icon={<EmailIcon/>}/>
                </div>

                <div className="am-input-group">
                  <FloatField label="Password" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handle} icon={<LockIcon/>}
                    suffix={<button type="button" className="am-eye" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOpenIcon/> : <EyeClosedIcon/>}</button>}
                  />
                </div>

                {/* ── FORGOT PASSWORD LINK (wired) ── */}
                <div className="am-forgot-row">
                  <span
                    className="am-forgot"
                    onClick={handleForgotPasswordClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleForgotPasswordClick()}
                  >
                    Forgot password?
                  </span>
                </div>

                <button className="am-submit" onClick={handleLogin} type="button" disabled={isLoading}>
                  {isLoading ? "Signing in…" : "Sign In"} <ArrowIcon/>
                </button>

                <div className="am-divider">
                  <span className="am-div-line"/><span className="am-div-text">Or continue with</span><span className="am-div-line"/>
                </div>

                <button className="am-google-btn" onClick={handleGoogleLogin} disabled={isLoading}>
                  <GoogleIcon/><span>Continue with Google</span>
                </button>

                <p className="am-switch-text">
                  New here? <span className="am-switch-link" onClick={() => setMode("register")}>Create an account</span>
                </p>
                <div className="am-promo">⚡ Play and win exciting prizes — absolutely free!</div>
              </div>
            )}

            {/* ── Register ── */}
            {mode === "register" && (
              <div className="am-form am-form-register">
                <div className="am-form-head">
                  <h2 className="am-title">Create Account</h2>
                  <p className="am-sub">Join for exclusive offers &amp; member pricing</p>
                </div>

                <div className="am-two-col">
                  <div className="am-input-group">
                    <FloatField label="First Name" name="firstName" type="text" value={form.firstName} onChange={handle} icon={<UserIcon/>}/>
                  </div>
                  <div className="am-input-group">
                    <FloatField label="Last Name" name="lastName" type="text" value={form.lastName} onChange={handle} icon={<UserIcon/>}/>
                  </div>
                </div>

                <div className="am-input-group">
                  <FloatField label="Email Address" name="email" type="email" value={form.email} onChange={handle} icon={<EmailIcon/>}/>
                </div>

                <div className="am-two-col">
                  <div className="am-input-group">
                    <FloatField label="Phone" name="phone" type="tel" value={form.phone} onChange={handle} icon={<PhoneIcon/>}/>
                  </div>
                  <div className="am-input-group">
                    <FloatField label="Password" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handle} icon={<LockIcon/>}
                      suffix={<button type="button" className="am-eye" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOpenIcon/> : <EyeClosedIcon/>}</button>}
                    />
                  </div>
                </div>

                <label className="am-terms-row">
                  <span className="am-custom-check" onClick={() => setAgreeTerms(!agreeTerms)}>
                    <input type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} className="am-check-native"/>
                    <span className="am-check-box">
                      {agreeTerms && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </span>
                  </span>
                  <span className="am-terms-text" onClick={() => setAgreeTerms(!agreeTerms)}>
                    I agree to the <span className="am-switch-link" onClick={e => e.stopPropagation()}>Terms of Service</span> and <span className="am-switch-link" onClick={e => e.stopPropagation()}>Privacy Policy</span>
                  </span>
                </label>

                <button className="am-submit" type="button" disabled={isLoading} onClick={() => {
                  if (agreeTerms) {
                    toast.success("Account created successfully");
                  } else {
                    toast.error("Please agree to Terms & Privacy Policy");
                  }
                }}>
                  {isLoading ? "Creating…" : "Create Account"} <ArrowIcon/>
                </button>

                <div className="am-divider">
                  <span className="am-div-line"/><span className="am-div-text">Or sign up with</span><span className="am-div-line"/>
                </div>
                <button className="am-google-btn" onClick={handleGoogleLogin} disabled={isLoading}>
                  <GoogleIcon/><span>Continue with Google</span>
                </button>

                <p className="am-switch-text">
                  Already a member? <span className="am-switch-link" onClick={() => setMode("login")}>Sign in here</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── ALL EXISTING STYLES UNCHANGED ── */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Inter:wght@300;400;500&display=swap');
          .am-shell { position:relative;display:flex;width:${showLeftPanel?"860px":isMobile?"95vw":"460px"};height:${showLeftPanel?"570px":"auto"};border-radius:22px;overflow:hidden;font-family:'Inter',sans-serif;box-shadow:0 32px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(14,165,233,0.15); }
          .am-close { position:absolute;top:14px;right:14px;z-index:100;width:30px;height:30px;border-radius:50%;border:1px solid rgba(255,255,255,0.12);background:rgba(0,0,0,0.45);color:rgba(255,255,255,0.65);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.22s ease;backdrop-filter:blur(10px); }
          .am-close:hover { background:rgba(14,165,233,0.25);border-color:rgba(14,165,233,0.5);color:#fff;transform:rotate(90deg); }
          .am-left { position:relative;width:42%;flex-shrink:0;overflow:hidden;background:linear-gradient(145deg,#09185b 0%,#0B3C6D 50%,#1E3A8A 100%);display:flex;flex-direction:column;align-items:center;justify-content:center; }
          .am-geo { position:absolute;clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%); }
          .am-geo-1 { width:340px;height:340px;background:rgba(245,184,0,0.09);top:-110px;left:-110px; }
          .am-geo-2 { width:200px;height:200px;background:rgba(14,165,233,0.13);top:38%;left:-55px; }
          .am-geo-3 { width:110px;height:110px;background:rgba(245,184,0,0.07);bottom:55px;right:-18px; }
          .am-tri { position:absolute;width:0;height:0; }
          .am-tri-1 { border-left:120px solid transparent;border-right:120px solid transparent;border-bottom:200px solid rgba(245,184,0,0.09);bottom:0;left:-15px; }
          .am-tri-2 { border-left:80px solid transparent;border-right:80px solid transparent;border-bottom:150px solid rgba(14,165,233,0.12);bottom:0;left:120px; }
          .am-left-brand { position:absolute;top:20px;left:20px;display:flex;align-items:center;gap:7px;z-index:10; }
          .am-brand-star { color:#F5B800;font-size:12px; }
          .am-brand-name { font-family:'Poppins',sans-serif;font-weight:900;font-size:14px;letter-spacing:5px;color:#fff;text-transform:uppercase; }
          .am-figure { position:relative;z-index:5;display:flex;flex-direction:column;align-items:center;justify-content:center; }
          .am-glow { position:absolute;width:270px;height:270px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.30),transparent 70%);filter:blur(44px); }
          .am-jersey { object-fit:contain;filter:drop-shadow(0 18px 48px rgba(14,165,233,0.42));animation:amFloat 5s ease-in-out infinite;position:relative;z-index:2; }
          @keyframes amFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          .am-bg-text { position:absolute;font-family:'Poppins',sans-serif;font-weight:900;font-size:50px;letter-spacing:9px;color:rgba(255,255,255,0.04);text-transform:uppercase;white-space:nowrap;z-index:1; }
          .am-left-footer { position:absolute;bottom:16px;left:0;right:0;text-align:center;font-family:'Inter',sans-serif;font-size:8.5px;letter-spacing:2.5px;color:rgba(255,255,255,0.38);text-transform:uppercase;display:flex;align-items:center;justify-content:center;gap:8px;z-index:5; }
          .am-footer-dot { display:inline-block;width:3px;height:3px;border-radius:50%;background:#F5B800;opacity:0.65; }
          .am-right { flex:1;position:relative;background:linear-gradient(150deg,#0d1b3e 0%,#0f2252 35%,#0a1628 70%,#060d1f 100%);display:flex;flex-direction:column;padding:${isMobile?"14px 18px":"16px 28px"};overflow-y:auto; }
          .am-right-blob { position:absolute;border-radius:50%;pointer-events:none;z-index:0; }
          .am-right-blob-1 { width:280px;height:280px;background:radial-gradient(circle,rgba(14,165,233,0.12) 0%,transparent 70%);top:-60px;right:-60px;filter:blur(40px); }
          .am-right-blob-2 { width:200px;height:200px;background:radial-gradient(circle,rgba(245,184,0,0.07) 0%,transparent 70%);bottom:-40px;left:20px;filter:blur(50px); }
          .am-right > * { position:relative;z-index:1; }
          .am-mobile-brand { display:flex;align-items:center;gap:6px;justify-content:center;margin-bottom:16px; }
          .am-brand-star-sm { color:#F5B800;font-size:12px; }
          .am-brand-name-sm { font-family:'Poppins',sans-serif;font-weight:900;font-size:18px;letter-spacing:4px;background:linear-gradient(135deg,#fff,#0EA5E9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-transform:uppercase; }
          .am-tabs { display:flex;margin-bottom:8px;border-bottom:1px solid rgba(14,165,233,0.18);flex-shrink:0; }
          .am-tab { flex:1;padding:8px 0;background:transparent;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;font-family:'Poppins',sans-serif;font-weight:600;font-size:12px;letter-spacing:0.5px;color:rgba(255,255,255,0.38);cursor:pointer;transition:all 0.25s ease; }
          .am-tab-active { color:#0EA5E9;border-bottom-color:#0EA5E9; }
          .am-form { display:flex;flex-direction:column;gap:14px;flex:1;justify-content:center; }
          .am-form-register { gap:12px; }
          .am-form-head { margin-bottom:0px;flex-shrink:0; }
          .am-title { font-family:'Poppins',sans-serif;font-weight:700;font-size:${isMobile?"20px":"22px"};background:linear-gradient(135deg,#ffffff 0%,#93c5fd 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 2px;line-height:1.2; }
          .am-sub { font-size:11px;color:rgba(255,255,255,0.42);margin:0; }
          .am-input-group { margin-bottom:0; }
          .am-two-col { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .am-float-field { position:relative;flex-shrink:0; }
          .am-float-box { position:relative;border:1px solid rgba(14,165,233,0.22);border-radius:10px;background:rgba(255,255,255,0.04);backdrop-filter:blur(10px);display:flex;align-items:center;transition:border-color 0.2s,box-shadow 0.2s,background 0.2s; }
          .am-float-box:focus-within { border-color:#0EA5E9;background:rgba(14,165,233,0.07);box-shadow:0 0 0 3px rgba(14,165,233,0.13),0 0 16px rgba(14,165,233,0.10); }
          .am-float-icon { position:absolute;left:11px;display:flex;align-items:center;pointer-events:none;z-index:2; }
          .am-float-label { position:absolute;left:33px;top:50%;transform:translateY(-50%);font-family:'Inter',sans-serif;font-size:12px;color:rgba(255,255,255,0.30);pointer-events:none;transition:all 0.18s cubic-bezier(0.4,0,0.2,1);background:transparent;padding:0 3px;white-space:nowrap;z-index:2; }
          .am-float-label--up { top:0;transform:translateY(-50%);font-size:9.5px;color:#38bdf8;font-weight:600;letter-spacing:0.4px;left:10px;background:linear-gradient(to bottom,#0f2252 50%,transparent 100%);padding:0 4px; }
          .am-float-input { width:100%;padding:14px 12px 8px 33px;background:transparent;border:none;outline:none;font-family:'Inter',sans-serif;font-size:12.5px;color:#e2e8f0;box-sizing:border-box;z-index:1;line-height:1; }
          .am-float-input--pr { padding-right:34px; }
          .am-float-input::placeholder { color:transparent; }
          .am-eye { position:absolute;right:10px;background:transparent;border:none;cursor:pointer;display:flex;align-items:center;padding:0;color:rgba(255,255,255,0.28);transition:color 0.2s;z-index:3; }
          .am-eye:hover { color:#0EA5E9; }
          .am-forgot-row { display:flex;justify-content:flex-end;margin:-4px 0 0px;flex-shrink:0; }
          .am-forgot { font-size:10px;color:#38bdf8;cursor:pointer;font-family:'Inter',sans-serif;transition:opacity 0.2s; }
          .am-forgot:hover { opacity:0.7; }
          .am-submit { position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:10px;background:linear-gradient(135deg,#0EA5E9 0%,#0369a1 50%,#1e3a8a 100%);border:none;border-radius:10px;color:#fff;font-family:'Poppins',sans-serif;font-weight:700;font-size:13px;letter-spacing:0.8px;cursor:pointer;transition:all 0.25s ease;box-shadow:0 4px 20px rgba(14,165,233,0.30);flex-shrink:0; }
          .am-submit::before { content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transition:left 0.55s ease; }
          .am-submit:hover:not(:disabled)::before { left:100%; }
          .am-submit:hover:not(:disabled) { transform:translateY(-1px);box-shadow:0 8px 28px rgba(14,165,233,0.42); }
          .am-submit:active { transform:translateY(0); }
          .am-submit:disabled { opacity:0.55;cursor:not-allowed; }
          .am-divider { display:flex;align-items:center;gap:10px;margin:4px 0 4px;flex-shrink:0; }
          .am-div-line { flex:1;height:1px;background:rgba(255,255,255,0.08); }
          .am-div-text { font-size:9.5px;color:rgba(255,255,255,0.35);font-family:'Inter',sans-serif;text-transform:uppercase;letter-spacing:1px;white-space:nowrap; }
          .am-google-btn { display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:9px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.10);border-radius:10px;color:rgba(255,255,255,0.78);font-family:'Inter',sans-serif;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.25s ease;flex-shrink:0; }
          .am-google-btn:hover:not(:disabled) { background:rgba(255,255,255,0.09);border-color:rgba(255,255,255,0.20);transform:translateY(-1px); }
          .am-google-btn:disabled { opacity:0.55;cursor:not-allowed; }
          .am-terms-row { display:flex;align-items:center;gap:10px;flex-shrink:0;cursor:pointer;padding:4px 0; }
          .am-custom-check { position:relative;flex-shrink:0;width:18px;height:18px;display:flex;align-items:center;justify-content:center; }
          .am-check-native { position:absolute;opacity:0;width:0;height:0; }
          .am-check-box { width:18px;height:18px;border-radius:5px;border:1.5px solid rgba(14,165,233,0.45);background:rgba(14,165,233,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;flex-shrink:0; }
          .am-custom-check:hover .am-check-box { border-color:#0EA5E9;background:rgba(14,165,233,0.15); }
          input:checked ~ .am-check-box,.am-terms-row:has(input:checked) .am-check-box { background:linear-gradient(135deg,#0EA5E9,#0369a1);border-color:#0EA5E9;box-shadow:0 0 8px rgba(14,165,233,0.40); }
          .am-terms-text { font-size:11px;color:rgba(255,255,255,0.52);font-family:'Inter',sans-serif;line-height:1.4;user-select:none; }
          .am-switch-text { text-align:center;margin-top:6px;font-size:11px;color:rgba(255,255,255,0.40);font-family:'Inter',sans-serif;flex-shrink:0; }
          .am-switch-link { color:#38bdf8;font-weight:600;cursor:pointer;transition:opacity 0.2s; }
          .am-switch-link:hover { opacity:0.75; }
          .am-promo { text-align:center;margin-top:4px;font-size:9.5px;color:rgba(255,255,255,0.28);font-family:'Inter',sans-serif;flex-shrink:0; }
        `}</style>
      </Modal>

      {/* ── FORGOT PASSWORD MODAL — renders on top of AuthModal ── */}
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={handleForgotModalClose}
        onBackToLogin={handleBackToLogin}
      />
    </>
  );
}

/* ══ FloatField (unchanged) ══ */
function FloatField({ label, name, type = "text", value, onChange, icon, suffix }) {
  const [focused, setFocused] = useState(false);
  const isUp = focused || (value && value.length > 0);
  return (
    <div className="am-float-field">
      <div className="am-float-box">
        <span className="am-float-icon">{icon}</span>
        <span className={`am-float-label ${isUp ? "am-float-label--up" : ""}`}>{label}</span>
        <input
          className={`am-float-input${suffix ? " am-float-input--pr" : ""}`}
          name={name} type={type} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          autoComplete="off"
        />
        {suffix}
      </div>
    </div>
  );
}

/* ══ Icons (unchanged) ══ */
const ic = "#38bdf8";
const EmailIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>;
const LockIcon     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const UserIcon     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></svg>;
const PhoneIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.09 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const EyeOpenIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const EyeClosedIcon= () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 0 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
const ArrowIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.09 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}