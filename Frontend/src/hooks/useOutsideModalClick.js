import { useEffect, useRef } from "react";

export const useOutsideModalClick = (handler, listenCapturing = true) => {
  const ref = useRef();

  useEffect(
    function () {
      const handleClickOutSideModal = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      };

      document.addEventListener(
        "click",
        handleClickOutSideModal,
        listenCapturing
      );

      return () =>
        document.removeEventListener(
          "click",
          handleClickOutSideModal,
          listenCapturing
        );
    },
    [handler, listenCapturing]
  );

  return ref;
};
