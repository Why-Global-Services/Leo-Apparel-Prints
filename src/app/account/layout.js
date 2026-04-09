// src/app/account/layout.js
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "My Account | Leo-Cult",
  description: "Manage your profile and preferences",
};

export default function AccountLayout({ children }) {
  return (
    <div className="min-h-screen" style={{ background: "#f9fafb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* Page Header - with class for scroll detection */}
        <div className="account-header mb-6 sm:mb-8 lg:mb-10">
            <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold"
            style={{
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
            }}
          >
            <span style={{ color: "#1e293b" }}>My </span>
            <span style={{ color: "var(--primary)" }}>Account</span>
          </h1>
          <p className="text-sm sm:text-base mt-1" style={{ color: "#6b7280" }}>
            Manage your profile and preferences
          </p>
        </div>

        {/* Sidebar + Content - Using items-start for sticky positioning */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          <Sidebar />
          <div className="flex-1 w-full min-w-0">
            <div
              className="rounded-2xl p-5 sm:p-6 lg:p-8"
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              {children}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}