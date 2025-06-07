import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import Card from "./Card";
import { X } from "lucide-react";

function Modal({ title, children, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-testid="modal-container"
          className="fixed inset-0 z-[500] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            data-testid="modal-overlay"
            className="absolute inset-0 bg-black/30"
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />

          <motion.div
            data-testid="modal-content"
            className="relative z-10 w-full max-w-[450px]"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Card className="w-full p-5">
              <div className="flex justify-between">
                <p className="text-sm font-medium">{title}</p>
                <X 
                  data-testid="close-button"
                  className="size-5 cursor-pointer" 
                  onClick={onClose} 
                />
              </div>
              <div>{children}</div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
