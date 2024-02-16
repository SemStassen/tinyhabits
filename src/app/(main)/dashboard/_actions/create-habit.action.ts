"use server";

import { createHabitUseCase } from "@/use-cases/habits/create-habit.use-case";
import { createHabit } from "@/data-access/habits/create-habit.persistence";
import { ValidationError } from "@/use-cases/habits/utils";
import { revalidatePath } from "next/cache";

type Form = {
  emojiNative: string;
  name: string;
  quantity: string;
  step: string;
  unit?: string;
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
  const emojiNative = formData.get("emojiNative") as string;
  const name = formData.get("name") as string;
  const quantity = formData.get("quantity") as string;
  const step = formData.get("step") as string;
  const unit = formData.get("unit") as string;

  try {
    await createHabitUseCase(
      {
        createHabit: createHabit,
      },
      {
        name,
        emojiNative,
        quantity: parseInt(quantity),
        step: parseInt(step),
        unit: unit,
      },
    );

    revalidatePath("/dashboard");
    return {
      form: {
        emojiNative: "",
        name: "",
        quantity: "0",
        step: "1",
        unit: "",
      },
      status: "success",
    };
  } catch (err) {
    const error = err as Error;
    if (error instanceof ValidationError) {
      return {
        form: {
          emojiNative,
          name,
          quantity,
          step,
          unit,
        },
        status: "field-errors",
        errors: error.getErrors(),
      };
    } else {
      return {
        form: {
          emojiNative,
          name,
          quantity,
          step,
          unit,
        },
        status: "error",
        errors: error.message,
      };
    }
  }
}
