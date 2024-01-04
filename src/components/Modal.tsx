"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { HiMiniXMark } from "react-icons/hi2";

interface ModalProps extends Dialog.DialogProps {
  trigger: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
  description?: React.ReactNode;
}

function Modal({
  trigger,
  title,
  children,
  description,
  ...props
}: ModalProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-25" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[45] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] space-y-2 rounded-lg bg-neutral-100 px-8 py-7">
          <Dialog.Title className="text-xl font-bold text-black">
            {title}
          </Dialog.Title>
          {description && (
            <>
              <Dialog.Description>{description}</Dialog.Description>
              <hr className="bg-black" />
            </>
          )}
          {children}
          <Dialog.Close className="absolute right-7 top-7">
            <HiMiniXMark size={24} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface ModalCloseProps {
  children: React.ReactNode;
}

Modal.Close = function ModalClose({ children }: ModalCloseProps) {
  return <Dialog.Close>{children}</Dialog.Close>;
};

export default Modal;
