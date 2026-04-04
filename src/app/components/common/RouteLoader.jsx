"use client";

import { Suspense } from "react";
import { usePageLoader } from "@/hooks/usePageLoader";
import PageLoader from "./PageLoader";

function LoaderInner({ children }) {
  const loading = usePageLoader();
  return (
    <>
      {loading && <PageLoader />}
      {children}
    </>
  );
}

export default function RouteLoader({ children }) {
  return (
    <Suspense fallback={<PageLoader />}>
      <LoaderInner>{children}</LoaderInner>
    </Suspense>
  );
}
