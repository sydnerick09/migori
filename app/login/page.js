'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login(){const [phone,setPhone]=useState('');const [password,setPassword]=useState('');const [error,setError]=useState('');const router=useRouter();async function submit(e){e.preventDefault();const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,password})});const d=await r.json();if(!r.ok)return setError(d.error);localStorage.setItem('phone',phone);router.push('/dashboard');}return <main className={styles.shell}><form onSubmit={submit} className={styles.panel}><h1>Sign In</h1><input placeholder='Phone' onChange={e=>setPhone(e.target.value)} required/><input type='password' placeholder='Password' onChange={e=>setPassword(e.target.value)} required/><button>Login</button>{error&&<p>{error}</p>}</form></main>;}
