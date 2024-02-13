"use client";

import {
  Input,
  SubmitButton,
  Button,
  ErrorMessage,
  EmojiPicker,
  Modal,
} from "@/components";
import { useFormState } from "react-dom";
import { createHabitAction } from "./_actions/create-habit.action";
import { useEffect, useRef, useState } from "react";

function CreateHabitForm() {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("💧");
  const [formState, onCreateHabitAction] = useFormState(createHabitAction, {
    form: {
      emojiNative: "",
      name: "",
      quantity: "0",
      step: "1",
      unit: "",
    },
    status: "default",
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (formState.status === "success") {
      formRef.current?.reset();
      setModalIsOpen(false);
    }
  }, [formState]);

  return (
    <Modal
      trigger={<Button>New Habit</Button>}
      title="New Habit"
      description="Create a new habit to track."
      open={modalIsOpen}
      onOpenChange={setModalIsOpen}
    >
      <form action={onCreateHabitAction} ref={formRef}>
        <EmojiPicker onEmojiSelect={(d) => setSelectedEmoji(d.native)} />
        <input type="hidden" name="emojiNative" value={selectedEmoji} />
        <div>
          <Input label="Name" name="name" defaultValue={formState.form.name} />
          {formState.status === "field-errors" && (
            <ErrorMessage error={formState.errors.name} />
          )}
        </div>
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          defaultValue={formState.form.quantity}
          min={0}
        />
        {formState.status === "field-errors" && (
          <ErrorMessage error={formState.errors.quantity} />
        )}
        <Input
          label="Step size"
          name="step"
          type="number"
          defaultValue={formState.form.step}
          min={1}
        />
        {formState.status === "field-errors" && (
          <ErrorMessage error={formState.errors.step} />
        )}
        <Input label="Unit" name="unit" defaultValue={formState.form.unit} />
        {formState.status === "field-errors" && (
          <ErrorMessage error={formState.errors.unit} />
        )}
        <SubmitButton
          submitText="create new habit"
          idleText="creating habit..."
        />
      </form>
    </Modal>
  );
}

export default CreateHabitForm;
