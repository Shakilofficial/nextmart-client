import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteModalProps {
  name: string | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmationModal: React.FC<DeleteModalProps> = ({
  name,
  isOpen,
  onOpenChange,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[360px] md:max-w-md rounded-lg border-2 border-primary/50">
        <DialogHeader>
          <DialogTitle className="text-primary">Delete Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete
            <span className="font-semibold text-primary mx-1">{name}</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between gap-2">
          <Button
            size={"sm"}
            variant="outline"
            className="text-xs"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            size={"sm"}
            className="text-xs"
            variant="destructive"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
