'use client';

import Script from 'next/script';
import { useState } from 'react';
import { Loader2, Wallet } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

interface PaymentButtonProps {
  projectId: string;
  paymentType: 'ADVANCE' | 'MILESTONE' | 'FINAL';
  milestoneId?: string;
  label: string;
  disabled?: boolean;
  completedLabel?: string;
}

export default function PaymentButton({
  projectId,
  paymentType,
  milestoneId,
  label,
  disabled = false,
  completedLabel = 'Already Paid',
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handlePay = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, paymentType, milestoneId }),
      });
      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        setMessage(orderData.error ?? 'Unable to create payment order.');
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'NextGenWebWorks',
        description: label,
        order_id: orderData.order.id,
        handler: async (response: Record<string, string>) => {
          const verifyResponse = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paymentId: orderData.paymentId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (!verifyResponse.ok) {
            setMessage(verifyData.error ?? 'Payment verification failed.');
            return;
          }

          setMessage('Payment received successfully.');
          window.location.reload();
        },
        theme: {
          color: '#8b5cf6',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      setMessage('Unexpected issue while opening Razorpay.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div>
        <button
          type="button"
          onClick={handlePay}
          disabled={loading || disabled}
          className={`w-full justify-center ${disabled ? 'btn-secondary' : 'btn-primary'} disabled:opacity-70`}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Wallet size={16} />}
          {disabled ? completedLabel : label}
        </button>
        {message ? <p className="mt-2 text-xs text-slate-400">{message}</p> : null}
      </div>
    </>
  );
}
