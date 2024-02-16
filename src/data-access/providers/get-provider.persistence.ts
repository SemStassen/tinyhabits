import { db } from "@/db";
import { eq } from "drizzle-orm";
import type { Provider } from "@/db/schema";
import type { ProviderDto } from "@/use-cases/providers/types";

export function toDtoMapper(provider: Provider): ProviderDto {
  return {
    id: provider.id,
    userId: provider.userId,
    providerName: provider.providerName,
    providerUserId: provider.providerUserId,
  };
}

export async function getProvider(
  providerName: "github",
  providerUserId: string,
): Promise<ProviderDto | null> {
  const foundProvider = await db.query.providers.findFirst({
    where: (provider, { and }) =>
      and(
        eq(provider.providerName, providerName),
        eq(provider.providerUserId, providerUserId),
      ),
  });

  if (!foundProvider) {
    return null;
  }

  return toDtoMapper(foundProvider);
}
