"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloatButton() {
  const phoneNumber = "919087149666";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl sm:bottom-2 sm:right-6"
    >
      <FaWhatsapp className="h-8 w-8 sm:h-8 sm:w-8" />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}
