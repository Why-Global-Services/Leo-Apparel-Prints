"use client";

import { useEffect } from "react";
import { setupInterceptors } from "@/lib/interceptor";

export default function InitInterceptors() {
  useEffect(() => {
    setupInterceptors(); // 🔥 this activates axios interceptors
    console.log("Interceptors initialized ✅"); // debug
  }, []);

  return null;
}