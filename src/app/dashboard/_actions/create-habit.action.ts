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

async function createHabitAction(
  state: CreateItemState,
  formData: FormData,
): Promise<CreateItemState> {
  console.log({ state, formData });

  return {
    form: {
      name: "",
    },
    status: "success",
  };
}

export default createHabitAction;
