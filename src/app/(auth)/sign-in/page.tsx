import { Button } from "@/components/button";
import Link from "next/link";

function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="rounded-md border border-stone-950 bg-white p-4">
        <h1 className="text-2xl font-semibold">
          <small>Tiny</small>Habits
        </h1>
        <Link href="/api/v1/auth/github">Sign in with GitHub</Link>
      </div>
    </div>
  );
}

export default LoginPage;
