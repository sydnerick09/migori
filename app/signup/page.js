'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signup.module.css';

export default function Signup() {
  const [form, setForm] = useState({ username: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  async function submit(e){e.preventDefault();setError('');
  const r=await fetch('/api/auth/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
  const d=await r.json();if(!r.ok)return setError(d.error);localStorage.setItem('phone',form.phone);router.push('/assessment/1');}
  return <main className={styles.wrap}><form onSubmit={submit} className={styles.card}><h1>Create account</h1><input placeholder='Username' onChange={e=>setForm({...form,username:e.target.value})} required/><input placeholder='Phone (07XXXXXXXX)' pattern='^(?:\\+254|0)[17]\\d{8}$' onChange={e=>setForm({...form,phone:e.target.value})} required/><button>Create</button>{error&&<p>{error}</p>}</form></main>
}
