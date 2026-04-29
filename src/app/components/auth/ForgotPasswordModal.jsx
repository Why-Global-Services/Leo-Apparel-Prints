"use client";
import { useState, useEffect, useRef } from "react";
import Modal from "../common/Modal";
import { useDispatch } from "react-redux";
import { forgotPassword, verifyResetOtp, resetPassword } from "@/features/auth/authThunks";
import toast from "react-hot-toast";

/**
 * ForgotPasswordModal
 * ─────────────────────────────────────────────────────
 * Step 1 — Enter email  → sends OTP
 * Step 2 — Enter 6-digit OTP
 * Step 3 — Set new password
 * Step 4 — Success screen
 *
 * Props:
 *   isOpen   : boolean
 *   onClose  : () => void
 *   onBackToLogin : () => void   ← called when user wants to go back to AuthModal login
 */
export default function ForgotPasswordModal({ isOpen, onClose, onBackToLogin }) {
  const [step, setStep] = useState(1); // 1 | 2 | 3 | 4
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [errors, setErrors] = useState({});
  const [resetToken, setResetToken] = useState("");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  const otpRefs = useRef([]);
  const timerRef = useRef(null);
  const dispatch = useDispatch();

  const isMobile = windowWidth <= 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
      setResendTimer(0);
    }
  }, [isOpen]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [resendTimer]);

  // ── Step 1: Send OTP ──────────────────────────────────
  async function handleSendOtp() {
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsLoading(true);
    setErrors({});
    try {

     const res = await dispatch(forgotPassword({ email }));

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("OTP sent");
        setStep(2);
        setResendTimer(30);
      } else {
        setErrors({ email: res.payload?.message || "Failed to send OTP" });
      }
    } catch {
      setErrors({ email: "Failed to send OTP. Try again." });
    } finally {
      setIsLoading(false);
    }
  }

  // ── Step 2: Verify OTP ────────────────────────────────
  function handleOtpChange(index, value) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setErrors({});
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
    e.preventDefault();
  }

  async function handleVerifyOtp() {
    const code = otp.join("");
    if (code.length < 6) { setErrors({ otp: "Enter the 6-digit code" }); return; }
    setIsLoading(true);
    setErrors({});
    try {
      const code = otp.join("");

const res = await dispatch(
  verifyResetOtp({ email, otp: code })
);

if (res.meta.requestStatus === "fulfilled") {
  toast.success("OTP verified");

  setResetToken(res.payload.resetToken);
  setStep(3);
} else {
  setErrors({ otp: res.payload?.message || "Invalid OTP" });
}
      
      setStep(3);
    } catch {
      setErrors({ otp: "Invalid OTP. Please check and retry." });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendOtp() {
    if (resendTimer > 0) return;
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setOtp(["", "", "", "", "", ""]);
      setResendTimer(30);
      otpRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  }

  // ── Step 3: Reset Password ────────────────────────────
  async function handleResetPassword() {
    const errs = {};
    if (!newPassword) errs.newPassword = "Password is required";
    else if (newPassword.length < 8) errs.newPassword = "Minimum 8 characters";
    if (!confirmPassword) errs.confirmPassword = "Please confirm your password";
    else if (newPassword !== confirmPassword) errs.confirmPassword = "Passwords don't match";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsLoading(true);
    setErrors({});
    try {
      const res = await dispatch(
  resetPassword({
    token: resetToken,
    password: newPassword,
  })
);

if (res.meta.requestStatus === "fulfilled") {
  toast.success("Password reset successful");
  setStep(4);
} else {
  setErrors({ newPassword: res.payload?.message || "Reset failed" });
}
    } catch {
      setErrors({ newPassword: "Failed to reset password. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fp-shell">

        {/* Close */}
        <button className="fp-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Ambient blobs */}
        <div className="fp-blob fp-blob-1"/>
        <div className="fp-blob fp-blob-2"/>
        <div className="fp-blob fp-blob-3"/>

        {/* Progress bar */}
        {step < 4 && (
         <div className="fp-progress">
        {[1, 2, 3].map((s, i) => (
            <div key={s} className="fp-prog-wrapper">

            <div
                className={`fp-prog-step ${
                s < step ? "fp-prog-done" : s === step ? "fp-prog-active" : "fp-prog-idle"
                }`}
            >
                <div className="fp-prog-dot">
                {s < step ? <CheckIcon /> : <span>{s}</span>}
                </div>
                <span className="fp-prog-label">
                {s === 1 ? "Email" : s === 2 ? "Verify" : "Reset"}
                </span>
            </div>

            {/* LINE */}
            {i < 2 && (
                <div className={`fp-prog-line ${s < step ? "fp-prog-line-done" : ""}`} />
            )}
            </div>
        ))}
        </div>
        )}

        {/* ── STEP 1: Email Entry ── */}
        {step === 1 && (
          <div className="fp-content">
            <div className="fp-icon-wrap fp-icon-email">
              <MailBigIcon />
            </div>
            <h2 className="fp-title">Forgot Password?</h2>
            <p className="fp-desc">Enter your registered email and we'll send you a verification code.</p>

            <div className="fp-field-wrap">
              <FpFloatField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
                onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                icon={<EmailIcon />}
                error={errors.email}
              />
            </div>

            <button className="fp-submit" onClick={handleSendOtp} disabled={isLoading}>
              {isLoading ? <SpinIcon /> : null}
              {isLoading ? "Sending…" : "Send Verification Code"}
              {!isLoading && <ArrowIcon />}
            </button>

            <button className="fp-back-link" onClick={onBackToLogin}>
              <BackIcon /> Back to Sign In
            </button>
          </div>
        )}

        {/* ── STEP 2: OTP Verify ── */}
        {step === 2 && (
          <div className="fp-content">
            <div className="fp-icon-wrap fp-icon-otp">
              <ShieldIcon />
            </div>
            <h2 className="fp-title">Check Your Email</h2>
            <p className="fp-desc">
              We sent a 6-digit code to<br />
              <strong className="fp-email-highlight">{email}</strong>
            </p>

            {/* OTP Boxes */}
            <div className="fp-otp-row" onPaste={handleOtpPaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className={`fp-otp-box ${digit ? "fp-otp-filled" : ""} ${errors.otp ? "fp-otp-error" : ""}`}
                  autoFocus={i === 0}
                />
              ))}
            </div>
            {errors.otp && <p className="fp-error-msg">{errors.otp}</p>}

            <button className="fp-submit" onClick={handleVerifyOtp} disabled={isLoading}>
              {isLoading ? <SpinIcon /> : null}
              {isLoading ? "Verifying…" : "Verify Code"}
              {!isLoading && <ArrowIcon />}
            </button>

            {/* Resend */}
            <div className="fp-resend-row">
              <span className="fp-resend-text">Didn't receive it?</span>
              {resendTimer > 0 ? (
                <span className="fp-resend-timer">Resend in {resendTimer}s</span>
              ) : (
                <button className="fp-resend-btn" onClick={handleResendOtp} disabled={isLoading}>
                  Resend Code
                </button>
              )}
            </div>

            <button className="fp-back-link" onClick={() => setStep(1)}>
              <BackIcon /> Change Email
            </button>
          </div>
        )}

        {/* ── STEP 3: New Password ── */}
        {step === 3 && (
          <div className="fp-content">
            <div className="fp-icon-wrap fp-icon-lock">
              <LockBigIcon />
            </div>
            <h2 className="fp-title">Set New Password</h2>
            <p className="fp-desc">Choose a strong password for your account.</p>

            <div className="fp-field-wrap">
              <FpFloatField
                label="New Password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setErrors({}); }}
                icon={<LockIcon />}
                error={errors.newPassword}
                suffix={
                  <button type="button" className="fp-eye" onClick={() => setShowNew(!showNew)}>
                    {showNew ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </button>
                }
              />
              {/* Strength bar */}
              {newPassword && (
                <div className="fp-strength-wrap">
                  <div className="fp-strength-bars">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="fp-strength-bar"
                        style={{ background: n <= passwordStrength.score ? passwordStrength.color : "rgba(255,255,255,0.1)" }}
                      />
                    ))}
                  </div>
                  <span className="fp-strength-label" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            <div className="fp-field-wrap">
              <FpFloatField
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors({}); }}
                icon={<LockIcon />}
                error={errors.confirmPassword}
                suffix={
                  <button type="button" className="fp-eye" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </button>
                }
              />
            </div>

            {/* Password rules */}
            <div className="fp-rules">
              <PasswordRule met={newPassword.length >= 8} label="At least 8 characters" />
              <PasswordRule met={/[A-Z]/.test(newPassword)} label="One uppercase letter" />
              <PasswordRule met={/[0-9]/.test(newPassword)} label="One number" />
            </div>

            <button className="fp-submit" onClick={handleResetPassword} disabled={isLoading}>
              {isLoading ? <SpinIcon /> : null}
              {isLoading ? "Resetting…" : "Reset Password"}
              {!isLoading && <ArrowIcon />}
            </button>
          </div>
        )}

        {/* ── STEP 4: Success ── */}
        {step === 4 && (
          <div className="fp-content fp-success-content">
            <div className="fp-success-ring">
              <div className="fp-success-icon">
                <BigCheckIcon />
              </div>
            </div>
            <h2 className="fp-title fp-title-success">Password Reset!</h2>
            <p className="fp-desc fp-desc-success">
              Your password has been successfully reset.<br />You can now sign in with your new password.
            </p>
            <button className="fp-submit fp-submit-success" onClick={onBackToLogin}>
              Go to Sign In <ArrowIcon />
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Inter:wght@300;400;500&display=swap');

        /* ══ SHELL ══ */
        .fp-shell {
          position: relative;
          width: ${isMobile ? "93vw" : "440px"};
          border-radius: 22px;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(14,165,233,0.18);
          background: linear-gradient(150deg, #0d1b3e 0%, #0f2252 35%, #0a1628 70%, #060d1f 100%);
          padding: ${isMobile ? "24px 20px 28px" : "32px 36px 36px"};
        }

        /* ══ CLOSE ══ */
        .fp-close {
          position: absolute; top: 14px; right: 14px; z-index: 100;
          width: 30px; height: 30px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(0,0,0,0.45);
          color: rgba(255,255,255,0.65);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.22s ease;
          backdrop-filter: blur(10px);
        }
        .fp-close:hover {
          background: rgba(14,165,233,0.25);
          border-color: rgba(14,165,233,0.5);
          color: #fff;
          transform: rotate(90deg);
        }

        /* ══ AMBIENT BLOBS ══ */
        .fp-blob {
          position: absolute; border-radius: 50%;
          pointer-events: none; z-index: 0;
          filter: blur(50px);
        }
        .fp-blob-1 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(14,165,233,0.14) 0%, transparent 70%);
          top: -80px; right: -60px;
        }
        .fp-blob-2 {
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(245,184,0,0.08) 0%, transparent 70%);
          bottom: -50px; left: -30px;
        }
        .fp-blob-3 {
          width: 160px; height: 160px;
          background: radial-gradient(circle, rgba(30,58,138,0.6) 0%, transparent 70%);
          top: 40%; left: 50%; transform: translateX(-50%);
        }

        /* ══ PROGRESS ══ */
        .fp-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        .fp-prog-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          position: relative;
        }
        .fp-prog-dot {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Poppins', sans-serif;
          font-size: 11px; font-weight: 700;
          color: rgba(255,255,255,0.3);
          transition: all 0.35s ease;
          position: relative; z-index: 2;
        }
        .fp-prog-active .fp-prog-dot {
          border-color: #0EA5E9;
          background: rgba(14,165,233,0.18);
          color: #0EA5E9;
          box-shadow: 0 0 16px rgba(14,165,233,0.35);
        }
        .fp-prog-done .fp-prog-dot {
          border-color: #22c55e;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: #fff;
          box-shadow: 0 0 12px rgba(34,197,94,0.3);
        }
        .fp-prog-label {
          font-size: 9.5px;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.5px;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .fp-prog-active .fp-prog-label { color: #0EA5E9; }
        .fp-prog-done .fp-prog-label { color: #22c55e; }
         .fp-prog-wrapper {
            display: flex;
            align-items: center;
            }

            .fp-prog-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            }

            /* FIXED LINE */
            .fp-prog-line {
            width: 50px;
            height: 2px;
            background: rgba(255,255,255,0.15);
            margin: 0 8px;
            }

            .fp-prog-line-done {
            background: #22c55e;
            }
        .fp-prog-line-done { background: #22c55e; }

        /* ══ CONTENT ══ */
        .fp-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          position: relative; z-index: 1;
        }

        /* ══ ICON WRAPS ══ */
        .fp-icon-wrap {
          width: 68px; height: 68px;
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .fp-icon-email {
          background: linear-gradient(135deg, rgba(14,165,233,0.2), rgba(14,165,233,0.05));
          border: 1px solid rgba(14,165,233,0.3);
          box-shadow: 0 8px 32px rgba(14,165,233,0.2);
        }
        .fp-icon-otp {
          background: linear-gradient(135deg, rgba(245,184,0,0.2), rgba(245,184,0,0.05));
          border: 1px solid rgba(245,184,0,0.3);
          box-shadow: 0 8px 32px rgba(245,184,0,0.18);
        }
        .fp-icon-lock {
          background: linear-gradient(135deg, rgba(30,58,138,0.5), rgba(14,165,233,0.1));
          border: 1px solid rgba(14,165,233,0.25);
          box-shadow: 0 8px 32px rgba(30,58,138,0.3);
        }

        /* ══ TYPOGRAPHY ══ */
        .fp-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: ${isMobile ? "20px" : "22px"};
          background: linear-gradient(135deg, #ffffff 0%, #93c5fd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          text-align: center;
          line-height: 1.2;
        }
        .fp-title-success {
          background: linear-gradient(135deg, #ffffff 0%, #86efac 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .fp-desc {
          font-size: 12.5px;
          color: rgba(255,255,255,0.45);
          margin: -6px 0 0;
          text-align: center;
          line-height: 1.6;
        }
        .fp-desc-success { color: rgba(255,255,255,0.55); font-size: 13px; }
        .fp-email-highlight {
          color: #38bdf8;
          font-style: normal;
          font-weight: 600;
          display: block;
          margin-top: 3px;
        }

        /* ══ FIELD WRAP ══ */
        .fp-field-wrap { width: 100%; }

        /* ══ FLOATING LABEL INPUT (matches AuthModal) ══ */
        .fp-float-field { position: relative; width: 100%; }
        .fp-float-box {
          position: relative;
          border: 1px solid rgba(14,165,233,0.22);
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(10px);
          display: flex; align-items: center;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .fp-float-box:focus-within {
          border-color: #0EA5E9;
          background: rgba(14,165,233,0.07);
          box-shadow: 0 0 0 3px rgba(14,165,233,0.13), 0 0 16px rgba(14,165,233,0.10);
        }
        .fp-float-box-error { border-color: rgba(239,68,68,0.5) !important; }
        .fp-float-box-error:focus-within { 
          border-color: #ef4444 !important;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.12) !important;
        }
        .fp-float-icon {
          position: absolute; left: 11px;
          display: flex; align-items: center;
          pointer-events: none; z-index: 2;
        }
        .fp-float-label {
          position: absolute;
          left: 33px; top: 50%; transform: translateY(-50%);
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.30);
          pointer-events: none;
          transition: all 0.18s cubic-bezier(0.4,0,0.2,1);
          background: transparent;
          padding: 0 3px;
          white-space: nowrap;
          z-index: 2;
        }
        .fp-float-label--up {
          top: 0; transform: translateY(-50%);
          font-size: 9.5px;
          color: #38bdf8;
          font-weight: 600;
          letter-spacing: 0.4px;
          left: 10px;
          background: linear-gradient(to bottom, #0f2252 50%, transparent 100%);
          padding: 0 4px;
        }
        .fp-float-input {
          width: 100%;
          padding: 14px 12px 8px 33px;
          background: transparent; border: none; outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          color: #e2e8f0;
          box-sizing: border-box;
          z-index: 1; line-height: 1;
        }
        .fp-float-input--pr { padding-right: 36px; }
        .fp-float-input::placeholder { color: transparent; }
        .fp-eye {
          position: absolute; right: 10px;
          background: transparent; border: none; cursor: pointer;
          display: flex; align-items: center; padding: 0;
          color: rgba(255,255,255,0.28); transition: color 0.2s; z-index: 3;
        }
        .fp-eye:hover { color: #0EA5E9; }
        .fp-error-text {
          font-size: 11px;
          color: #f87171;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* ══ OTP BOXES ══ */
        .fp-otp-row {
          display: flex;
          gap: ${isMobile ? "8px" : "12px"};
          justify-content: center;
          width: 100%;
        }
        .fp-otp-box {
          width: ${isMobile ? "42px" : "50px"};
          height: ${isMobile ? "50px" : "58px"};
          border-radius: 12px;
          border: 2px solid rgba(14,165,233,0.22);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(10px);
          text-align: center;
          font-family: 'Poppins', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #e2e8f0;
          outline: none;
          transition: all 0.2s ease;
          caret-color: #0EA5E9;
        }
        .fp-otp-box:focus {
          border-color: #0EA5E9;
          background: rgba(14,165,233,0.1);
          box-shadow: 0 0 0 3px rgba(14,165,233,0.15), 0 0 20px rgba(14,165,233,0.15);
          transform: scale(1.06);
        }
        .fp-otp-filled {
          border-color: rgba(14,165,233,0.5);
          background: rgba(14,165,233,0.08);
        }
        .fp-otp-error { border-color: rgba(239,68,68,0.5) !important; }
        .fp-error-msg {
          font-size: 11.5px;
          color: #f87171;
          text-align: center;
          margin-top: -8px;
        }

        /* ══ RESEND ══ */
        .fp-resend-row {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          margin-top: -6px;
        }
        .fp-resend-text { font-size: 11.5px; color: rgba(255,255,255,0.38); }
        .fp-resend-timer { font-size: 11.5px; color: rgba(14,165,233,0.6); }
        .fp-resend-btn {
          font-size: 11.5px; font-weight: 600;
          color: #38bdf8;
          background: none; border: none; cursor: pointer;
          padding: 0;
          transition: opacity 0.2s;
        }
        .fp-resend-btn:hover { opacity: 0.7; }

        /* ══ STRENGTH BAR ══ */
        .fp-strength-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }
        .fp-strength-bars { display: flex; gap: 4px; flex: 1; }
        .fp-strength-bar {
          flex: 1;
          height: 3px;
          border-radius: 2px;
          transition: background 0.3s ease;
        }
        .fp-strength-label {
          font-size: 10px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.3px;
          flex-shrink: 0;
          transition: color 0.3s;
        }

        /* ══ PASSWORD RULES ══ */
        .fp-rules {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 100%;
          margin-top: -4px;
        }
        .fp-rule {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-family: 'Inter', sans-serif;
          transition: color 0.25s;
        }
        .fp-rule-dot {
          width: 14px; height: 14px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .fp-rule-met .fp-rule-dot {
          border-color: #22c55e;
          background: rgba(34,197,94,0.2);
        }
        .fp-rule-met { color: #86efac; }
        .fp-rule-unmet { color: rgba(255,255,255,0.28); }

        /* ══ SUBMIT ══ */
        .fp-submit {
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 12px;
          background: linear-gradient(135deg, #0EA5E9 0%, #0369a1 50%, #1e3a8a 100%);
          border: none; border-radius: 10px; color: #fff;
          font-family: 'Poppins', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: 0.8px;
          cursor: pointer; transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(14,165,233,0.30);
        }
        .fp-submit::before {
          content: '';
          position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.55s ease;
        }
        .fp-submit:hover:not(:disabled)::before { left: 100%; }
        .fp-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(14,165,233,0.42);
        }
        .fp-submit:active { transform: translateY(0); }
        .fp-submit:disabled { opacity: 0.55; cursor: not-allowed; }
        .fp-submit-success {
          background: linear-gradient(135deg, #16a34a 0%, #15803d 50%, #14532d 100%);
          box-shadow: 0 4px 20px rgba(34,197,94,0.25);
        }
        .fp-submit-success:hover:not(:disabled) {
          box-shadow: 0 8px 28px rgba(34,197,94,0.4);
        }

        /* ══ BACK LINK ══ */
        .fp-back-link {
          display: flex; align-items: center; gap: 6px;
          background: none; border: none; cursor: pointer;
          font-size: 11.5px; color: rgba(255,255,255,0.38);
          font-family: 'Inter', sans-serif;
          transition: color 0.2s;
          padding: 0;
          margin-top: -4px;
        }
        .fp-back-link:hover { color: #38bdf8; }

        /* ══ SUCCESS ══ */
        .fp-success-content { padding: 10px 0 6px; }
        .fp-success-ring {
          width: 90px; height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,197,94,0.18), transparent 70%);
          border: 2px solid rgba(34,197,94,0.3);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 40px rgba(34,197,94,0.2);
          animation: fpSuccessPop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .fp-success-icon {
          animation: fpCheckDraw 0.5s ease 0.3s both;
        }
        @keyframes fpSuccessPop {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fpCheckDraw {
          0% { opacity: 0; transform: scale(0.3); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* ══ SPINNER ══ */
        @keyframes fpSpin {
          to { transform: rotate(360deg); }
        }
        .fp-spin {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: fpSpin 0.7s linear infinite;
          flex-shrink: 0;
        }
      `}</style>
    </Modal>
  );
}

// ── Helper: password strength ──────────────────────────────────────────────
function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { score: 1, label: "Weak", color: "#ef4444" },
    { score: 2, label: "Fair", color: "#f59e0b" },
    { score: 3, label: "Good", color: "#0EA5E9" },
    { score: 4, label: "Strong", color: "#22c55e" },
  ];
  return map[score - 1] || { score: 0, label: "", color: "" };
}

// ── Password rule row ──────────────────────────────────────────────────────
function PasswordRule({ met, label }) {
  return (
    <div className={`fp-rule ${met ? "fp-rule-met" : "fp-rule-unmet"}`}>
      <div className="fp-rule-dot">
        {met && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
      </div>
      {label}
    </div>
  );
}

// ── FloatField (matches AuthModal style) ──────────────────────────────────
function FpFloatField({ label, type = "text", value, onChange, onKeyDown, icon, suffix, error }) {
  const [focused, setFocused] = useState(false);
  const isUp = focused || (value && value.length > 0);
  return (
    <div className="fp-float-field">
      <div className={`fp-float-box ${error ? "fp-float-box-error" : ""}`}>
        <span className="fp-float-icon">{icon}</span>
        <span className={`fp-float-label ${isUp ? "fp-float-label--up" : ""}`}>{label}</span>
        <input
          className={`fp-float-input${suffix ? " fp-float-input--pr" : ""}`}
          type={type} value={value} onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
        />
        {suffix}
      </div>
      {error && <p className="fp-error-text">⚠ {error}</p>}
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────
const ic = "#38bdf8";
const EmailIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>;
const LockIcon     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const EyeOpenIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const EyeClosedIcon= () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 0 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
const ArrowIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const BackIcon     = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>;
const CheckIcon    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const BigCheckIcon = () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const SpinIcon     = () => <div className="fp-spin"/>;
const MailBigIcon  = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>;
const ShieldIcon   = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
const LockBigIcon  = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="#0EA5E9"/></svg>;