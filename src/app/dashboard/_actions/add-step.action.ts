"use server";

import { getHabit } from "@/data-access/habits/get-habit.persistence";
import { updateHabit } from "@/data-access/habits/update-habit.persistence";
import { addStepUseCase } from "@/use-cases/habits/add-step.use-case";
import { revalidatePath } from "next/cache";

export async function addStepAction(state: void, formData: FormData) {
  const habitId = parseInt(formData.get("habitId") as string);

  const habit = await addStepUseCase(
    {
      getHabit: getHabit,
      updateHabit: updateHabit,
    },
    {
      habitId,
    },
  );

  revalidatePath("/dashboard");
}
