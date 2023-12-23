import { getHabits } from "@/data-access/habits/get-habits.persistence";
import CreateHabitForm from "./create-habit-form";
import Habit from "./habit";

async function DashboardPage() {
  const habits = await getHabits();

  return (
    <main className="min-h-screen p-8">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {habits.map((habit) => (
          <Habit key={habit.id} habit={habit} />
        ))}
        <CreateHabitForm />
      </div>
    </main>
  );
}

export default DashboardPage;
