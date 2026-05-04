'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './results.module.css';

export default function Results(){const [score,setScore]=useState(0);const router=useRouter();useEffect(()=>{const phone=localStorage.getItem('phone');const answers=JSON.parse(localStorage.getItem('assessment')||'[]');const correct=['build the future','positive','business','D4','positive'];let s=answers.reduce((n,a,i)=>n+(String(a||'').trim().toLowerCase()===correct[i]?1:0),0);setScore(s);fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,password:'__noop__',assessmentScore:s})});fetch('/api/auth/signup',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,score:s})});},[]);
const passed=score>=4.5;
return <main className={styles.shell}><div className={styles.card}><h1>{passed?'Congratulations! You passed':'Please try again'}</h1><p>Score: {score}/5</p><p>{passed?'You qualify for AI training tasks':'Pass mark is 90%'}</p>{passed&&<button onClick={()=>router.push('/bonus')}>Continue</button>}</div></main>}
