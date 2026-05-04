import { getPackage, upgradeUser } from '@/lib/store';

export async function POST(req){
  const { phone, packageKey, amount, channel } = await req.json();
  const plan = getPackage(packageKey);
  if (!plan || Number(amount) !== plan.cost) return Response.json({ error: 'Invalid payment' }, { status: 400 });
  const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
  if (paystackSecret) {
    // Simulated success callback flow
  }
  const user = upgradeUser(phone, packageKey);
  return Response.json({ success: true, channel: channel || 'M-Pesa', user });
}
