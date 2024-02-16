"use server";

import { cookies } from "next/headers";
import { createClient } from "./server";
import { redirect } from "next/navigation";

async function getUser() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    // TODO: Maybe make this more robust
    redirect("/login");
  }

  return data;
}

export default getUser;
