import * as schema from "./schema";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { habits } from "./schema";
declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(process.env.NEXT_PUBLIC_SUPABASE_URL!), { schema });
} else {
  if (!global.db) {
    global.db = drizzle(postgres(process.env.NEXT_PUBLIC_SUPABASE_URL!), {
      schema,
    });
  }
  db = global.db;
}

export { db };
