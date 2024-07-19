import React, { useState, useEffect } from "react";
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
    <div>
      <div className={`modal-overlay ${show ? "show" : ""}`} onClick={onClose}>
        <div
          className={`modal-content ${modalAnimation}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* <span className="close-button" onClick={onClose}>
            &times;
          </span> */}
          <div className="modal-body">
            <h3>{content.title}</h3>
            <div className="modal-text">
              <img
                src={content.images[currentImageIndex]}
                alt={content.title}
              />
              <p>{content.blurbs[currentBlurbIndex]}</p>
            </div>
          </div>
          <div className="modal-footer">
            {/* <button
              className="next-button"
              onClick={() => {
                nextBlurb();
                nextImage();
              }}
            >
              &rarr;
            </button> */}
            <button className="next-button" onClick={() => {nextBlurb(); nextImage();}}>
              <span>Next</span>
              <svg width="15" height="15" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" stroke-linejoin="round" stroke-linecap="round"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationModal;
