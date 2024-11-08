// src/pages/TestToast.js
import React from "react";
import { useToast } from "@/hooks/use-toast";

export default function TestToast() {
  const { toast, toasts } = useToast();

  React.useEffect(() => {
    toast({
      title: "Test Toast",
      description: "This is a test toast notification.",
      variant: "default",
    });
  }, []);

  console.log("Rendering toasts:", toasts); // Log to confirm re-renders

  return (
    <div>
      <h1>Test Toast Component</h1>
      <div>
        {toasts.map((toast) => (
          <div key={toast.id} style={{ border: "1px solid black", padding: "10px", margin: "5px" }}>
            <h2>{toast.title}</h2>
            <p>{toast.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
