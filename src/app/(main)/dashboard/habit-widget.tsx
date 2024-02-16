"use client";

import { deleteHabitAction } from "./_actions/delete-habit.action";
import { addStepAction } from "./_actions/add-step.action";
import { removeStepAction } from "./_actions/remove-step.action";
import type { HabitAction } from "./habits";
import type { HabitDto } from "@/use-cases/habits/types";
import { Emoji } from "@/components";
import { X, Plus, Minus } from "lucide-react";
import {
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

interface HabitWidgetProps {
  habit: HabitDto;
  action: HabitAction;
}

function HabitWidget({ habit, action }: HabitWidgetProps) {
  const router = useRouter();

  const [optimisticQuantity, updateOptimisticQuantity] = useOptimistic(
    habit.quantity,
    (state: number, step: number) => {
      return state + step;
    },
  );
  const [optimisticDelete, updateOptimisticDelete] = useOptimistic(
    false,
    (state) => {
      return true;
    },
  );

  const onDeleteAction = async (formData: FormData) => {
    updateOptimisticDelete(null);
    await deleteHabitAction(formData);
  };

  const onAddStepAction = async () => {
    updateOptimisticQuantity(habit.step);
    await addStepAction(habit.id);
  };

  const onRemoveStepAction = async (formData: FormData) => {
    updateOptimisticQuantity(-habit.step);
    await removeStepAction(formData);
  };

  const [mouseDownCounter, setMouseDownCounter] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Change the interval time to update the timing!
  const startMouseDown = () => {
    if (intervalRef.current) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setMouseDownCounter((prev) => prev + 1);
    }, 7);
  };

  const endMouseDown = () => {
    if (intervalRef.current) {
      if (mouseDownCounter < 25) {
        router.push(`/dashboard/${habit.id}`);
      }
      clearInterval(intervalRef.current);
      setMouseDownCounter(0);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if ((mouseDownCounter - 25) % 100 == 0 && mouseDownCounter > 100) {
      startTransition(() => {
        onAddStepAction();
      });
    }
  }, [mouseDownCounter]);

  return optimisticDelete ? (
    <></>
  ) : (
    <button
      className="relative flex aspect-square flex-col items-center justify-center rounded-3xl border border-neutral-400 bg-white p-4 shadow-md"
      style={{
        backgroundImage: `linear-gradient(to top, var(--green-500) ${
          (mouseDownCounter - 25) % 100
        }%, #ffffff 0%)`,
      }}
      onMouseDown={startMouseDown}
      onMouseUp={endMouseDown}
      onMouseLeave={endMouseDown}
    >
      <Emoji emoji={habit.emojiNative} size={40} />
      <h3 className="text-lg font-semibold">{habit.name}</h3>
      <div className="text-sm">
        <span>{optimisticQuantity}</span> {habit.unit}
      </div>

      {/* Old buttons */}
      {/* <div className="flex w-full justify-between gap-4">
        <form className="block" action={onRemoveStepAction}>
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
      </div> */}

      {action == "edit" && (
        <>
          <form action={onDeleteAction}>
            <input type="hidden" name="habitId" value={habit.id} />
            <button
              type="submit"
              className="absolute -right-4 -top-3 grid size-8 place-content-center rounded-full bg-red-600"
            >
              <X size={24} className="stroke-white" />
            </button>
          </form>
        </>
      )}
    </button>
  );
}

export default HabitWidget;
