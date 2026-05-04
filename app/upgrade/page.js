'use client';
import { useRouter } from 'next/navigation';
import styles from './upgrade.module.css';
const plans=[['beginner',110,800],['skilled',130,1500],['expert',150,2000],['elite',200,4000]];
export default function Upgrade(){const router=useRouter();return <main className={styles.shell}><h1>Account Upgrade</h1><section className={styles.grid}>{plans.map(([k,c,e])=><article className={styles.card} key={k}><h3>{k==='skilled'?'Average Skilled':k[0].toUpperCase()+k.slice(1)}</h3><p>Cost: KSh {c}</p><p>Earnings: up to KSh {e}</p><button onClick={()=>router.push(`/payment?package=${k}`)}>Choose</button></article>)}</section></main>}
