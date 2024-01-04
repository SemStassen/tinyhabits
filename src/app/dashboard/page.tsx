import { getHabits } from "@/data-access/habits/get-habits.persistence";
import Habits from "./habits";
import data from "@emoji-mart/data";
import { init } from "emoji-mart";

init({ data });

async function DashboardPage() {
  const habits = await getHabits();

  return (
    <div className="min-h-screen space-y-4 p-8">
      <Habits habits={habits} />
    </div>
  );
}

export default DashboardPage;
