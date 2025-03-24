import { useEffect, useRef } from "react";

const FlightModal = ({ openModal, setModalOpen }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };
    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  return (
    <>
      {/*Modal Overlay*/}
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full z-10 bg-neutral-900 transition-opacity duration-300 opacity-50"></div>
      )}
      <div
        ref={modalRef}
        className={`fixed top-0 right-0 w-[47%] h-full bg-white z-20 shadow-lg transition-transform duration-300 ${
          openModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        dsad
      </div>
    </>
  );
};

export default FlightModal;
