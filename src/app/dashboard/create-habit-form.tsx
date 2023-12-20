"use client";

import { Modal, Input, SubmitButton } from "@/components";
import { useFormState } from "react-dom";
import { HiMiniPlus } from "react-icons/hi2";
import { createHabitAction } from "./_actions/create-habit.action";
import { useEffect, useRef, useState } from "react";

function CreateHabitForm() {
  const [formState, onCreateHabitAction] = useFormState(createHabitAction, {
    form: {
      name: "",
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
    <div className="align-center flex aspect-square justify-center rounded-3xl border border-neutral-400 bg-neutral-200">
      <Modal
        trigger={<HiMiniPlus className="text-neutral-400" size={160} />}
        title="New Habit"
        description="Create a new habit to track."
        open={modalIsOpen}
        onOpenChange={setModalIsOpen}
      >
        <form action={onCreateHabitAction} ref={formRef}>
          <Input label="Name" name="name" defaultValue={formState.form.name} />
          <SubmitButton
            submitText="create new habit"
            idleText="creating habit..."
          />
        </form>
      </Modal>
    </div>
  );
}

export default CreateHabitForm;
