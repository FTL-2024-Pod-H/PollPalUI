import React, { useState } from "react";
import "./EducationModal.css";

const EducationModal = ({
  show,
  onClose,
  content,
  currentImageIndex,
  nextImage,
  currentBlurbIndex,
  nextBlurb,
  modalAnimation,
}) => {
  const [isVisible, setIsVisible] = useState(show);

  if (!isVisible && !show) return null;

  return (
    <div className={`modal-overlay ${show ? "show" : ""}`} onClick={onClose}>
      <div
        className={`modal-content ${modalAnimation}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="modal-body">
          <h3>{content.title}</h3>
          <div className="modal-text">
            <img src={content.images[currentImageIndex]} alt={content.title} />
            <p>{content.blurbs[currentBlurbIndex]}</p>
          </div>
        </div>
        <button
          className="next-button"
          onClick={() => {
            nextBlurb();
            nextImage();
          }}
        >
          &#8594; {/* Unicode arrow symbol */}
        </button>
      </div>
    </div>
  );
};

export default EducationModal;
