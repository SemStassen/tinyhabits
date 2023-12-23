"use server";

import { createHabitUseCase } from "@/use-cases/create-habit.use-case";
import { createHabit } from "@/data-access/habits/create-habit.persistence";
import { ValidationError } from "@/use-cases/utils";
import { revalidatePath } from "next/cache";

type Form = {
  name: string;
};

type FieldErrorsState = {
  status: "field-errors";
  errors: Partial<Record<keyof Form, string>>;
};

type DefaultState = {
  status: "default";
};

type SubmitErrorState = {
  status: "error";
  errors: string;
};

type SuccessState = {
  status: "success";
};

type CreateHabitState = { form: Form } & (
  | SuccessState
  | SubmitErrorState
  | FieldErrorsState
  | DefaultState
);

export async function createHabitAction(
  state: CreateHabitState,
  formData: FormData,
): Promise<CreateHabitState> {
  const name = formData.get("name") as string;

  try {
    await createHabitUseCase(
      {
        createHabit: createHabit,
      },
      {
        name,
      },
    );
    revalidatePath("/dashboard");
    return {
      form: {
        name: "",
      },
      status: "success",
    };
  } catch (err) {
    const error = err as Error;
    if (error instanceof ValidationError) {
      return {
        form: {
          name,
        },
        status: "field-errors",
        errors: error.getErrors(),
      };
    } else {
      return {
        form: {
          name,
        },
        status: "error",
        errors: error.message,
      };
    }
  }
}
