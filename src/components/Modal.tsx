import { Button } from "@/components";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shad";
import { DialogProps } from "@radix-ui/react-dialog";

interface ModalProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  open?: DialogProps["open"];
  onOpenChange?: DialogProps["onOpenChange"];
}

function Modal({
  children,
  trigger,
  title,
  description,
  open,
  onOpenChange,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
