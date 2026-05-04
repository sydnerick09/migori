"use client";

import { Suspense } from "react";
import PaymentContent from "./PaymentContent";

export default function PaymentClient() {
  return (
    <Suspense fallback={<p>Loading payment...</p>}>
      <PaymentContent />
    </Suspense>
  );
}