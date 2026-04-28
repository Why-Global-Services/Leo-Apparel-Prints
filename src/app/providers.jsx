"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { setupInterceptors } from "@/lib/interceptor";

setupInterceptors();

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}