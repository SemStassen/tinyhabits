import { Button } from "@/components/button";
import { Emoji } from "@/components/emoji";
import { getHabit } from "@/data-access/habits/get-habit.persistence";
import { Ghost, Pencil } from "lucide-react";

interface HabitPageProps {
  params: {
    habitId: string;
  };
}

async function HabitPage({ params }: HabitPageProps) {
  const habit = await getHabit(params.habitId);

  if (!habit) {
    throw new Error("Habit not found");
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Emoji emoji={habit.emojiNative} size={32} />
          <h1 className="text-2xl font-bold">{habit.name}</h1>
        </div>
        <Button variant="ghost">
          <Pencil />
        </Button>
      </div>
    </div>
  );
}

export default HabitPage;
