import { getAuthToken, authenticate } from "./elektrum_auth.ts";
import { fetchDailyConsumption } from "./elektrum_fetch.ts";

// Deno.args
const args = Deno.args;
const session = new Map();
const token = await getAuthToken(session);
await authenticate(args[0], args[1], token, session);
const result = await fetchDailyConsumption(args[2], args[3], args[4], session);
console.log(result);
