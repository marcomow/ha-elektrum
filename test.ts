import { getAuthToken, authenticate } from "./elektrum_auth.ts";
import { fetchDailyConsumption } from "./elektrum_fetch.ts";

Deno.test("Happy path test", async () => {
  const session = new Map();
  const token = await getAuthToken(session);
  const isAuthenticated = await authenticate("username", "password", token, session);
  const result = await fetchDailyConsumption("2021", "3", "1", session);

  console.log(result);

  if (!isAuthenticated) {
    throw new Error("Authentication failed");
  }

  if (!result) {
    throw new Error("Failed to fetch daily consumption");
  }
});
