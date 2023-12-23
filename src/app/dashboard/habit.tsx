"use client";

import { useFormState } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { deleteHabitAction } from "./_actions/delete-habit.action";

interface Habit {
  id: number;
  name: string;
}

function Habit({ habit }: { habit: Habit }) {
  const [formState, onDeleteHabitAction] = useFormState(
    deleteHabitAction,
    undefined,
  );

  return (
    <div className="relative flex aspect-square items-center justify-center rounded-3xl border border-neutral-400 bg-neutral-200">
      {habit.name}
      <form action={onDeleteHabitAction}>
        <input type="hidden" name="habitId" value={habit.id} />
        <button type="submit" className="absolute right-4 top-4">
          <HiXMark size={24} />
        </button>
      </form>
    </div>
  );
}

export default Habit;
