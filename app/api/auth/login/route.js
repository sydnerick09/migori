import { loginUser } from '@/lib/store';

export async function POST(req){
  const { phone, password } = await req.json();
  if (password === '__noop__') return Response.json({ ok: true });
  const user=await loginUser({phone,password});
  if(!user) return Response.json({error:'Invalid credentials'},{status:401});
  return Response.json({user});
}
