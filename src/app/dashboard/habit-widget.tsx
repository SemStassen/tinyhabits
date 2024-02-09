"use client";

import { useFormState, useFormStatus } from "react-dom";
import { HiMiniMinus, HiMiniPlus, HiXMark } from "react-icons/hi2";
import { deleteHabitAction } from "./_actions/delete-habit.action";
import { addStepAction } from "./_actions/add-step.action";
import { removeStepAction } from "./_actions/remove-step.action";
import type { HabitAction } from "./habits";
import type { HabitDto } from "@/use-cases/habits/types";
import { Emoji } from "@/components";

interface HabitWidgetProps {
  habit: HabitDto;
  action: HabitAction;
}

function HabitWidget({ habit, action }: HabitWidgetProps) {
  const [deleteState, onDeleteHabitAction] = useFormState(
    deleteHabitAction,
    undefined,
  );

  const [addStepState, onAddStepAction] = useFormState(
    addStepAction,
    undefined,
  );

  const [removeStepState, onRemoveStepAction] = useFormState(
    removeStepAction,
    undefined,
  );

  return (
    <div className="relative flex aspect-square flex-col items-center justify-end rounded-3xl border border-neutral-400 bg-white p-4 shadow-md">
      <Emoji emoji={habit.emojiNative} size={80} />
      <div>
        <span className="text-2xl">{habit.quantity}</span> {habit.unit}
      </div>
      <h3 className="text-2xl font-semibold">{habit.name}</h3>
      <div className="flex w-full justify-between gap-4">
        <form action={onRemoveStepAction}>
          <input type="hidden" name="habitId" value={habit.id} />
          <button
            type="submit"
            className="grid size-12 place-content-center rounded-full border border-black"
          >
            <HiMiniMinus size={32} />
          </button>
        </form>
        <form action={onAddStepAction}>
          <input type="hidden" name="habitId" value={habit.id} />
          <button
            type="submit"
            className="grid size-12 place-content-center rounded-full border border-black"
          >
            <HiMiniPlus size={32} />
          </button>
        </form>
      </div>

      {action == "remove" && (
        <form action={onDeleteHabitAction}>
          <input type="hidden" name="habitId" value={habit.id} />
          <button
            type="submit"
            className="absolute -right-2 -top-2 grid size-8 place-content-center rounded-full bg-red-600"
          >
            <HiXMark size={24} className="fill-white" />
          </button>
        </form>
      )}
      {action == "edit" && (
        <button
          type="submit"
          className="absolute -right-2 -top-2 grid size-8 place-content-center rounded-full bg-blue-600"
        >
          <HiXMark size={24} className="fill-white" />
        </button>
      )}
    </div>
  );
}

export default HabitWidget;
