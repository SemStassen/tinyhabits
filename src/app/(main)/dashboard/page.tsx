import { getHabits } from "@/data-access/habits/get-habits.persistence";
import Habits from "./habits";
import data from "@emoji-mart/data";
import { init } from "emoji-mart";

init({ data });

async function DashboardPage() {
  const habits = await getHabits();

  return <Habits habits={habits} />;
}

export default DashboardPage;
