"use client";

import { X as IconClose } from "lucide-react";
import { motion } from "motion/react";
import ReactFocusLock from "react-focus-lock";
import { RemoveScroll as ReactRemoveScroll } from "react-remove-scroll";

import { cn } from "@/lib/utils";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ showModal, onClose, children, className }: ModalProps) {
  if (!showModal) return null;

  return (
    <ReactRemoveScroll>
      <ReactFocusLock returnFocus={true}>
        <div className="scroller fixed top-0 left-0 z-[100] grid h-screen w-full place-items-center overflow-y-auto p-6 backdrop-blur-md">
          <motion.div
            animate={{ scale: [0.6, 1], opacity: [0.6, 1] }}
            className={cn(
              "bg-background relative mx-auto max-h-fit w-full max-w-md rounded-lg border p-6",
              className,
            )}
          >
            <button
              className="group absolute top-3 right-3 cursor-pointer"
              onClick={onClose}
            >
              <IconClose className="text-muted-foreground group-hover:text-foreground h-5 w-5 transition-colors" />
            </button>
            {children}
          </motion.div>
        </div>
      </ReactFocusLock>
    </ReactRemoveScroll>
  );
}

export default Modal;
