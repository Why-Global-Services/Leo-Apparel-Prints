"use client";

import ForgotPasswordModal from "@/app/components/auth/ForgotPasswordModal";

export default function ForgotPasswordPage() {
  return (
    <div>
      <ForgotPasswordModal
        isOpen={true}
        onClose={() => {}}
        onBackToLogin={() => {}}
      />
    </div>
  );
}