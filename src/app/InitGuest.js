"use client";

import { useEffect } from "react";
import { getGuestId } from "@/lib/axios";

export default function InitGuest() {
  useEffect(() => {
    getGuestId();
  }, []);

  return null;
}