import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyPayment } from "@/services/user";

export default function PaymentStatus() {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        const resp = await verifyPayment(transactionId);
        setPaymentDetails(resp.data); // Assuming resp.data holds the relevant payment details
      } catch (err) {
        // Assume err.response.data holds the error structure
        setPaymentDetails(err.response.data);
      } finally {
        setIsLoading(false);
      }
    };

    verifyTransaction();

    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
          navigate('/');
        }
        return prevCount - 1;
      });
    }, 1000);

    // Cleanup function to clear interval
    return () => clearInterval(timer);
  }, [transactionId, navigate]); // Only re-run the effect if transactionId or navigate changes

  const Icon = () => {
    if (paymentDetails.status === "Successful") {
      return (
        <svg className="text-green-500 mx-auto my-2 w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414l1.293 1.293 3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="text-red-500 mx-auto my-2 w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.707 7.707a1 1 0 010-1.414 1 1 0 011.414 0L10 7.586l.879-.879a1 1 0 011.414 1.414L11.414 9l.879.879a1 1 0 01-1.414 1.414L10 10.414l-.879.879a1 1 0 01-1.414-1.414L8.586 9 7.707 8.121a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isLoading ? (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-center mb-2">Payment Status</h3>
          <Icon />
          <ul>
            <li><strong>Transaction ID:</strong> {transactionId}</li>
            <li><strong>Status:</strong> {paymentDetails.status}</li>
            <li><strong>Amount:</strong> ₹{paymentDetails.amount?.toLocaleString()}</li>
            <li><strong>Date:</strong> {new Date(paymentDetails.updatedAt).toLocaleDateString()}</li>
          </ul>
          <div className={`transition-all duration-500 ease-in-out text-center mt-4 p-2 rounded ${
            paymentDetails.status === "Successful"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
          }`}>
            {paymentDetails.status}
          </div>
          <div className="text-center mt-4">
            Redirecting in {countdown} seconds...
          </div>
        </div>
      )}
    </div>
  );
}
