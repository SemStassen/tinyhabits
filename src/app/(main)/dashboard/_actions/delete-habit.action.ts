"use server";

import { deleteHabit } from "@/data-access/habits/delete-habit.persistence";
import { deleteHabitUseCase } from "@/use-cases/habits/delete-habit.use-case";
import { revalidatePath } from "next/cache";

export async function deleteHabitAction(formData: FormData) {
  const habitId = formData.get("habitId") as string;

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
