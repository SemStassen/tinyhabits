import { getHabits } from "@/data-access/habits/get-habits.persistence";
import CreateHabitForm from "./create-habit-form";

async function DashboardPage() {
  const habits = await getHabits();

  return (
    <main className="min-h-screen p-8">
      <div className="grid grid-cols-6">
        {habits.map((habit) => (
          <div key={habit.id}>{habit.name}</div>
        ))}
        <CreateHabitForm />
      </div>
    </main>
  );
}

export default DashboardPage;
