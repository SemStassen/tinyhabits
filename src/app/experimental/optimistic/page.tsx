"use client";

import { useOptimistic, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { addCountAction } from "./add-count.action";

function Optimistic() {
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [optimisticCount, updateOptimisticCount] = useOptimistic(
    currentCount,
    (state: number, amount: number) => {
      return state + amount;
    },
  );

  const addCount = async () => {
    updateOptimisticCount(1);
    await addCountAction(currentCount);
  };

  const removeCount = async () => {
    updateOptimisticCount(-1);
    await addCountAction(currentCount);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">
        Optimistic updates with server actions
      </h1>
      <div className="flex items-center gap-8">
        <form action={removeCount}>
          <input type="hidden" name="habitId" />
          <button
            type="submit"
            className="grid size-12 place-content-center rounded-full border border-black"
          >
            <Minus size={32} />
          </button>
        </form>
        <div className="text-2xl font-bold">{optimisticCount}</div>
        <form action={addCount}>
          <input type="hidden" name="habitId" />
          <button
            type="submit"
            className="grid size-12 place-content-center rounded-full border border-black"
          >
            <Plus size={32} />
          </button>
        </form>
      </div>
    </>
  );
}

export default Optimistic;
