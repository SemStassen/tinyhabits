export interface ProviderDto {
  id: string;
  userId: string;
  providerName: "github";
  providerUserId: string;
}

export interface CreateProviderDto {
  userId: string;
  providerName: "github";
  providerUserId: string;
}
