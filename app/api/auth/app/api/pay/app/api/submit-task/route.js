import { submitTask } from '@/lib/store';
export async function POST(req){try{const {phone,taskId}=await req.json();return Response.json(submitTask(phone,Number(taskId)));}catch(e){return Response.json({error:e.message},{status:400});}}
