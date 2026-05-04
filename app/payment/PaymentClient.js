"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import styles from "./payment.module.css";

const costs = {
  beginner: 110,
  skilled: 130,
  expert: 150,
  elite: 200,
};

function PaymentContent() {
  const params = useSearchParams();
  const router = useRouter();

  const pkg = params.get("package") || "beginner";

  async function pay() {
    const phone = localStorage.getItem("phone");

    const r = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        packageKey: pkg,
        amount: costs[pkg],
        channel: "M-Pesa",
      }),
    });

    if (r.ok) router.push("/dashboard");
  }

  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <h1>Payment</h1>
        <p>Package: {pkg}</p>
        <p>Amount: KSh {costs[pkg]}</p>
        <button onClick={pay}>Pay with M-Pesa (Paystack)</button>
      </div>
    </main>
  );
}

export default function PaymentClient() {
  return (
    <Suspense fallback={<p>Loading payment...</p>}>
      <PaymentContent />
    </Suspense>
  );
}