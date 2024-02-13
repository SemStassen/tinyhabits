"use server";

import { getHabit } from "@/data-access/habits/get-habit.persistence";
import { updateHabit } from "@/data-access/habits/update-habit.persistence";
import { removeStepUseCase } from "@/use-cases/habits/remove-step.use-case";
import { revalidatePath } from "next/cache";

export async function removeStepAction(formData: FormData) {
  const habitId = parseInt(formData.get("habitId") as string);

  await removeStepUseCase(
    {
      getHabit,
      updateHabit,
    },
    {
      habitId,
    },
  );

  revalidatePath("/dashboard");
}
