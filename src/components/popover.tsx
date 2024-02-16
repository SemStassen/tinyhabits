import * as _Popover from "@radix-ui/react-popover";

interface PopoverProps
  extends _Popover.PopoverProps,
    _Popover.PopoverContentProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

function Popover({ trigger, children, ...props }: PopoverProps) {
  return (
    <_Popover.Root {...props}>
      <_Popover.Trigger asChild>{trigger}</_Popover.Trigger>
      <_Popover.Content {...props} className="z-50">
        {children}
      </_Popover.Content>
    </_Popover.Root>
  );
}

export { Popover };
