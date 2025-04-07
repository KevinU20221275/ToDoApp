import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
    console.log("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set");
    throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set");
}

export const tursoTasksDB = createClient({
    url,
    authToken,
})