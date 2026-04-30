import { JSX } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { MdWarning } from "react-icons/md";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
  confirmLabel?: string;
  confirmColor?: "danger" | "primary" | "warning";
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure? This action cannot be undone.",
  isLoading = false,
  confirmLabel = "Delete",
  confirmColor = "danger",
}: Props): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="center"
      classNames={{ backdrop: "bg-slate-900/60" }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <MdWarning className="text-amber-500 w-5 h-5" />
          <span>{title}</span>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-slate-600">{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose} isDisabled={isLoading} size="sm">
            Cancel
          </Button>
          <Button
            color={confirmColor}
            onPress={onConfirm}
            isLoading={isLoading}
            size="sm"
          >
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
