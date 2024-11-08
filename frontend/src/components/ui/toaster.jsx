import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()
  // console.log("Rendering toasts:", toasts);
  return (<ToastProvider>
      {children}
      <ToastViewport>
        {toasts.map(({ id, title, description, variant }) => (
          <Toast key={id} variant={variant}>
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{description}</ToastDescription>
            <ToastClose onClick={() => removeToast(id)} />
          </Toast>
        ))}
      </ToastViewport>
    </ToastProvider>
  );
}
