"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function usePageLoader() {
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading]   = useState(false);
  const [prevPath, setPrevPath] = useState(null);

  useEffect(() => {
    const current = pathname + searchParams.toString();

    if (prevPath === null) {
      setPrevPath(current);
      return;
    }

    if (current !== prevPath) {
      setLoading(true);
      setPrevPath(current);

      const timer = setTimeout(() => setLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]); 

  return loading;
}
