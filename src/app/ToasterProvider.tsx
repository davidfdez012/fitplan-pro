"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      richColors
      position="top-center"
      closeButton
      toastOptions={{
        style: {
          backgroundColor: "#050509",
          border: "1px solid rgba(82, 82, 91, 0.8)",
          color: "#f9fafb",
        },
      }}
    />
  );
}

