import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export type Habit = typeof habits.$inferSelect;
