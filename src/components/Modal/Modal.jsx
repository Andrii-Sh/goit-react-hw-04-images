import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ modalImg, closeModal, showModal }) => {
  useEffect(() => {
    if (showModal) {
      window.addEventListener('keydown', handleEscPress);
    }

    return () => {
      window.removeEventListener('keydown', handleEscPress);
    };
  }, []);

  const handleEscPress = evt => {
    if (evt.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={modalImg.url} alt={modalImg.alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  modalImg: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  closeModal: PropTypes.func.isRequired,
};
