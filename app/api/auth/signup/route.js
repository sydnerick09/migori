import { createUser, setAssessment } from '@/lib/store';

export async function POST(req){
  try{const body=await req.json();const user=await createUser(body);return Response.json({user});}
  catch(e){return Response.json({error:e.message},{status:400});}
}

export async function PUT(req){
  const { phone, score } = await req.json();
  const user = setAssessment(phone, score >= 4.5, score);
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 });
  return Response.json({ user });
}
