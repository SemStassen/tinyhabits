import type { Config } from "drizzle-kit";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    host: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    port: 5432,
    user: "postgres",
    password: "KaatSkylos1!",
    connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  },
} satisfies Config;
