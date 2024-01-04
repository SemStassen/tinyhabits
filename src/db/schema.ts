import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  quantity: integer("quantity").default(0).notNull(),
  step: integer("step").default(1).notNull(),
  unit: varchar("unit", { length: 255 }),
  emojiNative: varchar("emoji_native", { length: 15 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Habit = typeof habits.$inferSelect;
