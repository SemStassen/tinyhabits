import { Modal, Input } from "@/components";
import { useFormState } from "react-dom";
import { HiMiniPlus } from "react-icons/hi2";

function NewHabit() {
  const [formState, onCreateHabitAction] = useFormState(() => null, {
    form: {
      name: "",
    },
    status: "default",
  });

  return (
    <div className="align-center flex aspect-square justify-center rounded-3xl border border-neutral-400 bg-neutral-200">
      <Modal
        trigger={<HiMiniPlus className="text-neutral-400" size={160} />}
        title="New Habit"
        description="Create a new habit to track."
      >
        <form action={onCreateHabitAction}>
          <Input label="Name" name="name" defaultValue={formState?.form.name} />
        </form>
      </Modal>
    </div>
  );
}

export default NewHabit;
