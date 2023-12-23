"use server";

import { deleteHabit } from "@/data-access/habits/delete-habit.persistence";
import { deleteHabitUseCase } from "@/use-cases/delete-habit.use-case";
import { revalidatePath } from "next/cache";

export async function deleteHabitAction(state: void, formData: FormData) {
  const habitId = parseInt(formData.get("habitId") as string);

  await deleteHabitUseCase(
    {
      deleteHabit,
    },
    {
      habitId,
    },
  );

  revalidatePath("/dashboard");
}
