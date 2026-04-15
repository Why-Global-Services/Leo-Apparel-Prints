"use client";

import Link from "next/link"; 
import { useState } from "react";

const faqData = {
  GENERAL: [
    {
      question: "What is custom sportswear?",
      answer:
        "Custom sportswear refers to athletic clothing designed and manufactured specifically for your team or organization, featuring your colors, logos, and designs.",
    },
    {
      question: "How long does it take to receive my order?",
      answer:
        "Standard delivery takes 2–3 weeks. Express options are available at checkout for faster turnaround.",
    },
  ],
  SPORTS: [
    {
      question: "Which sports do you cater to?",
      answer:
        "We cater to over 50+ sports including football, basketball, cricket, rugby, athletics, and many more.",
    },
    {
      question: "Can I order for multiple sports at once?",
      answer:
        "Yes! You can place separate orders for different sports or contact our team for bulk multi-sport packages.",
    },
  ],
  "3D KIT BUILDER": [
    {
      question: "How does the 3D preview customiser work?",
      popular: true,
      answer:
        "Our 3D preview tool lets you rotate, zoom, and customise your kit in real time. Simply choose a base template, apply your colors, upload logos, and see instant results from every angle.",
    },
    {
      question: "Can I save my design and come back to it?",
      answer:
        "Yes! Create a free account and your designs are auto-saved in your dashboard. You can return, edit, and order at any time.",
    },
    {
      question: "What collar styles are available?",
      answer:
        "We offer crew neck, V-neck, polo collar, and zip collar styles, all customisable in the 3D builder.",
    },
    {
      question: "Can I preview the back of the kit?",
      answer:
        "Absolutely. The 3D viewer allows full 360° rotation so you can inspect every side of your kit before ordering.",
    },
  ],
  "LOGOS & DESIGN": [
    {
      question: "What file formats do you accept for logos?",
      answer:
        "We accept SVG, AI, EPS, and high-resolution PNG files (300dpi or above) for best print quality.",
    },
    {
      question: "Can your team design a logo for me?",
      answer:
        "Yes, our in-house design team can create a custom logo starting from £49. Contact support to get started.",
    },
  ],
  SIZING: [
    {
      question: "Do you offer junior and adult sizes?",
      answer:
        "Yes, we offer a full range from junior XS through to adult 4XL. Size guides are available on each product page.",
    },
    {
      question: "What if I'm between sizes?",
      answer:
        "We recommend sizing up, and our support team can advise based on your measurements. Custom sizing is also available.",
    },
  ],
  ORDERING: [
    {
      question: "What is the minimum order quantity?",
      answer:
        "Our minimum order is just 5 items per style. Bulk discounts apply for orders of 20+.",
    },
    {
      question: "Can I mix different products in one order?",
      answer:
        "Yes! You can combine jerseys, shorts, socks, and other accessories in a single order.",
    },
  ],
};

const tabs = Object.keys(faqData);

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "4.9/5", label: "Avg Rating" },
  { value: "50+", label: "Countries" },
  { value: "24/7", label: "Support" },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("3D KIT BUILDER");
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentFAQs = faqData[activeTab] || [];

  const filteredFAQs = searchQuery.trim()
    ? Object.values(faqData)
        .flat()
        .filter((faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : currentFAQs;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      style={{ fontFamily: "'Barlow', 'Arial Narrow', Arial, sans-serif" }}
      className="min-h-screen bg-white"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&display=swap');

        .tab-active {
          color: #1a2e6e;
          border-bottom: 3px solid #1a2e6e;
          font-weight: 700;
        }
        .tab-inactive {
          color: #888;
          border-bottom: 3px solid transparent;
          font-weight: 600;
        }
        .tab-inactive:hover {
          color: #1a2e6e;
        }
        .faq-item {
          border-bottom: 1px solid #e5e7eb;
          transition: background 0.2s;
        }
        .faq-item:first-child {
          border-top: 1px solid #e5e7eb;
        }
        .faq-answer {
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.3s ease;
        }
        .chevron {
          transition: transform 0.3s ease;
        }
        .chevron.open {
          transform: rotate(180deg);
        }
        .search-input:focus {
          outline: none;
          border-color: #1a2e6e;
          box-shadow: 0 0 0 3px rgba(26, 46, 110, 0.1);
        }
        .stat-item {
          text-align: center;
        }
        .cta-section {
          background: linear-gradient(135deg, #1a2e6e 0%, #0e4fa8 60%, #1565c0 100%);
        }
      `}</style>

      {/* Hero Section */}
      <section className="text-center px-6 py-16 max-w-2xl mx-auto">
        <p
          style={{ color: "#1a2e6e", letterSpacing: "0.15em", fontSize: 13 }}
          className="font-bold uppercase flex items-center justify-center gap-2 mb-4"
        >
          <span
            style={{
              display: "inline-block",
              width: 32,
              height: 2,
              background: "#1a2e6e",
            }}
          />
          Help Center
        </p>
        <h1
          style={{ color: "#1a2e6e", lineHeight: 1.1 }}
          className="text-5xl font-black mb-2"
        >
          Your Questions,
        </h1>
        <h1
          style={{ color: "#f5a623", lineHeight: 1.1 }}
          className="text-5xl font-black mb-6"
        >
          Answered
        </h1>
        <p style={{ color: "#666" }} className="text-base leading-relaxed mb-10">
          Everything you need to know about designing, ordering, and receiving
          your custom sportswear — fast, clear, no fluff.
        </p>

        {/* Search */}
       <div className="relative max-w-xs mx-auto group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null);
            }}
            placeholder="Search FAQs..."
           className="w-full border-0 border-b border-gray-300 px-4 py-2 text-sm text-black focus:outline-none bg-transparent"
            style={{ fontFamily: "inherit" }}
          />
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-300"></span>

          <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-[#1a2e6e] transition-all duration-300 group-focus-within:left-0 group-focus-within:w-full"></span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#999",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              ✕
            </button>
          )}
        </div>
      </section>

      {/* Tabs */}
      {!searchQuery && (
        <div
          style={{ borderBottom: "1px solid #e5e7eb" }}
          className="overflow-x-auto"
        >
          <div
            className="flex gap-0 px-6 max-w-4xl mx-auto"
            style={{ minWidth: "max-content" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setOpenIndex(null);
                }}
                className={`px-5 py-4 text-xs tracking-widest uppercase transition-all ${
                  activeTab === tab ? "tab-active" : "tab-inactive"
                }`}
                style={{ fontFamily: "inherit", background: "none", border: "none", cursor: "pointer" }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        {!searchQuery && (
          <div className="mb-8">
            <p
              style={{ color: "#1a2e6e", letterSpacing: "0.15em", fontSize: 12 }}
              className="font-bold uppercase flex items-center gap-2 mb-2"
            >
              <span
                style={{
                  display: "inline-block",
                  width: 28,
                  height: 2,
                  background: "#1a2e6e",
                }}
              />
              {activeTab}
            </p>
            <h2
              style={{ color: "#1a2e6e" }}
              className="text-3xl font-black"
            >
              {activeTab === "3D KIT BUILDER"
                ? "3D Kit Builder"
                : activeTab.charAt(0) + activeTab.slice(1).toLowerCase()}
            </h2>
          </div>
        )}

        {searchQuery && (
          <p style={{ color: "#888" }} className="mb-6 text-sm">
            Showing results for{" "}
            <strong style={{ color: "#1a2e6e" }}>"{searchQuery}"</strong> —{" "}
            {filteredFAQs.length} found
          </p>
        )}

        <div>
          {filteredFAQs.length === 0 ? (
            <p style={{ color: "#999" }} className="py-8 text-center text-sm">
              No questions found. Try a different search term.
            </p>
          ) : (
            filteredFAQs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="faq-item">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full text-left flex items-center justify-between py-5 gap-4"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <span
                      className="flex items-center gap-3"
                      style={{
                        color: "#1a2e6e",
                        fontWeight: 700,
                        fontSize: 15,
                      }}
                    >
                      {faq.question}
                      {faq.popular && (
                        <span
                          style={{
                            background: "#f5a623",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 700,
                            borderRadius: 999,
                            padding: "2px 10px",
                            letterSpacing: "0.04em",
                          }}
                        >
                          Popular
                        </span>
                      )}
                    </span>
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        border: "2px solid #1a2e6e",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#1a2e6e",
                      }}
                    >
                      <svg
                        className={`chevron ${isOpen ? "open" : ""}`}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className="faq-answer"
                    style={{
                      maxHeight: isOpen ? "300px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p
                      style={{ color: "#555", fontSize: 14, lineHeight: 1.7 }}
                      className="pb-5 pr-10"
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Stats */}
      <section
        style={{ borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}
        className="py-12 px-6"
      >
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <p
                style={{ color: "#1a2e6e", fontSize: 32, lineHeight: 1 }}
                className="font-black mb-1"
              >
                {stat.value}
              </p>
              <p style={{ color: "#888", fontSize: 13 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section text-center py-16 px-6">
        <h2 className="text-white text-2xl font-black mb-2">
          Still have questions?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }} className="mb-8">
          Our team is here to help you — reach out anytime.
        </p>
       <Link href="/contact-us">
        <button
          style={{
            background: "#f5a623",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "14px 32px",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            fontFamily: "inherit",
            letterSpacing: "0.02em",
          }}
        >
          Contact Support
        </button>
       </Link>
      </section>
    </div>
  );
}