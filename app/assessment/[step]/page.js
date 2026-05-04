'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './assessmentStep.module.css';

const questions=[
'Arrange words: "future the build"',
'Classify: "Great service" (positive/negative)',
'Fix spelling: "busines"',
'Next in pattern: A1, B2, C3, ? ',
'Label sentiment: "This app is amazing"'
];

export default function Step(){const {step}=useParams();const s=Number(step);const router=useRouter();const [answer,setAnswer]=useState('');function next(){const ans=JSON.parse(localStorage.getItem('assessment')||'[]');ans[s-1]=answer;localStorage.setItem('assessment',JSON.stringify(ans));if(s<5)router.push(`/assessment/${s+1}`);else router.push('/results');}
return <main className={styles.base}><div className={styles.card}><h1>AI Training Assessment</h1><p>Complete this quick assessment (2–5 minutes)</p><p className={styles.progress}>{s}/5</p><h2>{questions[s-1]}</h2><input value={answer} onChange={e=>setAnswer(e.target.value)} placeholder='Your answer'/><button onClick={next}>Next Question</button></div></main>}
