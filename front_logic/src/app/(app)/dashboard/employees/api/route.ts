import { getEmployees } from "@/server_actions/(get-requests)/getEmployees";

//boiler plate for route.ts for route handlers
export async function GET() {
   const res = await getEmployees();

   return new Response(JSON.stringify(res), { status: 200 });
}