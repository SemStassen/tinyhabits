import type { UserDto } from "@/use-cases/users/types";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { User, users } from "@/db/schema";

export function toDtoMapper(user: User): UserDto {
  return {
    id: user.id,
    name: user.name,
  };
}

export async function getUser(id: string): Promise<UserDto> {
  const foundUser = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  if (!foundUser) {
    throw new Error("User not found");
  }

  return toDtoMapper(foundUser);
}
