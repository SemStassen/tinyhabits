import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey(),
  userId: varchar("id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

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
export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
