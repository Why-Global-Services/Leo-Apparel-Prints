"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { setupInterceptors } from "@/lib/interceptor";
import { useEffect } from "react";

export function Providers({ children }) {
  useEffect(() => {
    setupInterceptors(); // ✅ runs once on client
  }, []);

  return <Provider store={store}>{children}</Provider>;
}