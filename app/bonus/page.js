'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './bonus.module.css';
export default function Bonus(){const [bal,setBal]=useState(100);const router=useRouter();useEffect(()=>{(async()=>{const p=localStorage.getItem('phone');const r=await fetch('/api/tasks?phone='+encodeURIComponent(p));const d=await r.json();setBal(d.user?.balance||100)})();},[]);return <main className={styles.bg}><div className={styles.card}><h1>You have received KSh 100 signup bonus</h1><p>Balance: KSh {bal}</p><button onClick={()=>router.push('/dashboard')}>Go to Dashboard</button></div></main>}
