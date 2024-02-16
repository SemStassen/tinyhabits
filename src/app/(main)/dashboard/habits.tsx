"use client";

import { Button } from "@/components";
import CreateHabitForm from "./create-habit-form";
import HabitWidget from "./habit-widget";
import { useState } from "react";
import type { HabitDto } from "@/use-cases/habits/types";

export type HabitAction = "edit" | null;

function Habits({ habits }: { habits: HabitDto[] }) {
  const [action, setAction] = useState<HabitAction>(null);

  return (
    <>
      <div className="flex gap-4">
        <CreateHabitForm />
        <Button
          onClick={() => setAction((prev) => (prev == "edit" ? null : "edit"))}
        >
          {action == "edit" ? "Stop editing" : "Edit habits"}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {habits.map((habit) => (
          <HabitWidget key={habit.id} habit={habit} action={action} />
        ))}
      </div>
    </>
  );
}

export default Habits;
