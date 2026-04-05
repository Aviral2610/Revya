"use client";

import { useCallback, useEffect, useState } from "react";

export function useDemoToast() {
  const [toast, setToast] = useState("");

  const showToast = useCallback((message) => {
    setToast(message);
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToast("");
    }, 2400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toast]);

  return { showToast, toast };
}
