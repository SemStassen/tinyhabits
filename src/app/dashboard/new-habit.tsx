import { Modal } from "@/components";
import { HiMiniPlus } from "react-icons/hi2";

function NewHabit() {
  return (
    <div className="align-center flex aspect-square justify-center rounded-3xl border border-neutral-400 bg-neutral-200">
      <Modal
        trigger={<HiMiniPlus className="text-neutral-400" size={160} />}
        title="New Habit"
        description="Create a new habit to track."
      >
        test
      </Modal>
    </div>
  );
}

export default NewHabit;
