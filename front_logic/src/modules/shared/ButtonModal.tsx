import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ButtonModal({
  title,
  open,
  setOpen,
  children,
  className,
}: {
  className?: string;
  title?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>
        <Button>{title}</Button>
      </DialogTrigger>
      <DialogContent className={`${className}`}>
        <DialogHeader className="px-5 pt-5">
          <DialogTitle>{title ?? "Modal"}</DialogTitle>
        </DialogHeader>
        <div className={`px-5 pb-5 ${className}`}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
