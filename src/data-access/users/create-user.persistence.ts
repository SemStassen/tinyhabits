import { db } from "@/db";
import { users } from "@/db/schema";
import type { CreateUserDto } from "@/use-cases/users/types";

// exception for returning, only used for auth purposes!!!
export async function createUser(user: CreateUserDto): Promise<{ id: string }> {
  const createdUser = await db
    .insert(users)
    .values(user)
    .returning({ id: users.id });

  return createdUser[0];
}
