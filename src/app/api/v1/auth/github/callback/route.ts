import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { lucia } from "@/lib/auth/lucia";
import { github } from "@/lib/auth/github";
import { getProvider } from "@/data-access/providers/get-provider.persistence";
import { getUser } from "@/data-access/users/get-user.persistence";
import { createUser } from "@/data-access/users/create-user.persistence";
import { createProvider } from "@/data-access/providers/create-provider.persistence";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const githubUser: GitHubUser = await githubUserResponse.json();
    const existingProvider = await getProvider("github", githubUser.id);

    if (existingProvider) {
      const existingUser = await getUser(existingProvider.userId);

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const createdUser = await createUser({
      name: githubUser.login,
    });

    await createProvider({
      userId: createdUser.id,
      providerName: "github",
      providerUserId: githubUser.id,
    });

    const session = await lucia.createSession(createdUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: string;
  login: string;
}
