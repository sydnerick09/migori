'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signup.module.css';

export default function Signup() {
  const [form, setForm] = useState({
    username: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState('');
  const router = useRouter();

  function normalizePhone(phone) {
    phone = phone.trim();

    // 07XXXXXXXX → 2547XXXXXXXX
    if (phone.startsWith('0')) {
      return '254' + phone.slice(1);
    }

    // +254XXXXXXXXX → 254XXXXXXXXX
    if (phone.startsWith('+254')) {
      return phone.slice(1);
    }

    return phone;
  }

  function isValidKenyanPhone(phone) {
    return /^(?:\+254|0)?[0-9]{9}$/.test(phone);
  }

  async function submit(e) {
    e.preventDefault();
    setError('');

    if (!isValidKenyanPhone(form.phone)) {
      return setError('Enter a valid Kenyan phone number');
    }

    const phone = normalizePhone(form.phone);

    const r = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        phone,
      }),
    });

    const d = await r.json();

    if (!r.ok) return setError(d.error);

    localStorage.setItem('phone', phone);
    router.push('/assessment/1');
  }

  return (
    <main className={styles.wrap}>
      <form onSubmit={submit} className={styles.card}>
        <h1>Create account</h1>

        <input
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          required
        />

        <input
          placeholder="Phone (07XXXXXXXX or +254XXXXXXXXX)"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button>Create</button>

        {error && <p>{error}</p>}
      </form>
    </main>
  );
}