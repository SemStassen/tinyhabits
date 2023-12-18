"use server";

import { createHabitUseCase } from "@/use-cases/habits/create-habit.use-case";
import { createHabit } from "@/data-access/create-habit.persistence";

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

type CreateItemState = { form: Form } & (
  | SuccessState
  | SubmitErrorState
  | FieldErrorsState
  | DefaultState
);

export async function createHabitAction(
  state: CreateItemState,
  formData: FormData,
): Promise<CreateItemState> {
  try {
    await createHabitUseCase(
      {
        createHabit: createHabit,
      },
      {
        name: formData.get("name") as string,
      },
    );

    return {
      form: {
        name: "",
      },
      status: "success",
    };
  } catch (error) {
    return {
      form: {
        name: "",
      },
      status: "error",
      errors: "oops",
    };
  }
}
