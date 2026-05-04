'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function Dashboard(){const [data,setData]=useState({tasks:[],user:null});const [msg,setMsg]=useState('');const router=useRouter();const phone=typeof window!=='undefined'?localStorage.getItem('phone'):'';
async function load(){const r=await fetch('/api/tasks?phone='+encodeURIComponent(phone));setData(await r.json());}
useEffect(()=>{if(phone)load();},[phone]);
async function doTask(id){const r=await fetch('/api/submit-task',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,taskId:id})});const d=await r.json();if(!r.ok){setMsg(d.error);return;}setMsg(`Task completed! +KSh ${d.reward}`);load();}
return <main className={styles.page}><header className={styles.top}><h1>Dashboard</h1><p>User: {data.user?.username}</p><p>Available balance: KSh {data.user?.balance ?? 0}</p><button onClick={()=>setMsg('Withdrawal simulated via M-Pesa ✅')}>Withdraw</button></header><section className={styles.list}>{data.tasks.map(t=><article key={t.id} className={styles.task}><h3>{t.title}</h3><p>{t.description}</p><p>Reward: KSh {t.reward}</p>{t.completed?<span>Completed</span>:t.locked?<button onClick={()=>router.push('/upgrade')}>Upgrade</button>:<button onClick={()=>doTask(t.id)}>Start Task</button>}</article>)}</section>{msg&&<div className={styles.toast}>{msg}</div>}</main>}
