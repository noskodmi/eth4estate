// components/UI/Modal.tsx
import { FC, ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

/**
 * A simple DaisyUI‐based modal.
 *
 * Usage:
 *   <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Hello">
 *     <p>Modal content here</p>
 *   </Modal>
 */
const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    // The outer wrapper must have both "modal" and, when open, "modal-open"
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      {/* Clicking on this overlay does nothing by default—closing is handled by our 'Close' button */}
      <div className="modal-box relative">
        {/* Close button in the top‐right corner */}
        <button type="button" onClick={onClose} className="btn btn-md btn-circle absolute right-2 top-2">
          ✕
        </button>

        {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
