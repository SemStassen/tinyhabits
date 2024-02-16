import { getHabits } from "@/data-access/habits/get-habits.persistence";
import Habits from "./habits";
import data from "@emoji-mart/data";
import { init } from "emoji-mart";
import getUser from "@/lib/utils/supabase/user";

init({ data });

async function DashboardPage() {
  const user = await getUser();

  console.log(user);

  const habits = await getHabits();

  return <Habits habits={habits} />;
}

export default DashboardPage;
