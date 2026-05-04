import { getTasksForUser, getUser } from '@/lib/store';

export async function GET(req){
  const phone=new URL(req.url).searchParams.get('phone');
  if(!phone) return Response.json({error:'phone required'},{status:400});
  return Response.json({tasks:getTasksForUser(phone),user:getUser(phone)});
}
