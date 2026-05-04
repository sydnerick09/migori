import Link from 'next/link';
import styles from './landing.module.css';

export default function Landing() {
  return (
    <main className={styles.wrapper}>
      <section className={styles.heroCard}>
        <h1>Business Hub</h1>
        <p>Earning money by training AI and digital creations</p>
      </section>
      <section className={styles.cardGrid}>
        <article className={styles.card}><h2>Welcome to the future of earning</h2><p>Complete simple AI training tasks and earn real money</p><ul><li>Text annotation</li><li>Classification</li><li>Clarification</li></ul></article>
        <article className={styles.card}><h2>Features</h2><p>Instant Payout: Withdraw to M-Pesa or PayPal</p><p>Work Anywhere: Accessible via phone or laptop</p><p>Bonus: Earn up to KSh 100 signup bonus</p></article>
      </section>
      <section className={styles.actionCard}>
        <label><input type="checkbox" /> Agree to Terms & Privacy Policy</label>
        <Link className={styles.primaryBtn} href="/signup">Create Account</Link>
        <Link className={styles.secondary} href="/login">Already have an account? Sign In</Link>
      </section>
      <footer className={styles.footer}>© {new Date().getFullYear()} Business Hub. All rights reserved.</footer>
    </main>
  );
}
