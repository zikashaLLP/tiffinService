// src/components/GlobalToastContainer.js
import React from 'react';
import { useToast } from "@/hooks/use-toast";

export default function GlobalToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded shadow-lg ${toast.variant === 'destructive' ? 'bg-red-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          <strong>{toast.title}</strong>
          <p>{toast.description}</p>
        </div>
      ))}
    </div>
  );
}
