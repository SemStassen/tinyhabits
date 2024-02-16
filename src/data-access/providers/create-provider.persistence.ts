import { db } from "@/db";
import { providers } from "@/db/schema";
import type { CreateProviderDto } from "@/use-cases/providers/types";

export async function createProvider(
  provider: CreateProviderDto,
): Promise<void> {
  await db.insert(providers).values(provider);
}
