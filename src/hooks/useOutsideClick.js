import { useEffect } from "react";

// Logic to click out of bounds
// custom hook
export default function useOutsideClick(ref, exceptionId, cb) {
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exceptionId
      ){
        cb();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, cb, exceptionId]);
}

