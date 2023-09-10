import * as React from "react";
import Modal from "react-modal";

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        maxWidth: '400px',
        maxHeight: '80%',
        width: '90%',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    closeButton: {
        position: 'relative',
        bottom: '0px',
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        marginTop: '10px',
    },
};

export default function AlertBox ({ isOpen, onClose, content }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Custom Modal"
            style={customStyles}
        >
            <div>
                <h2>Warning</h2>
                <p>{content}</p>
                <button
                    onClick={onClose}
                    style={customStyles.closeButton}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};