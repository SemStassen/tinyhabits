import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import * as schema from "./schema";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(process.env.DATABASE_URL), { schema });
} else {
  if (!global.db) {
    global.db = drizzle(postgres(process.env.DATABASE_URL), {
      schema,
    });
  }
  db = global.db;
}

export { db };
