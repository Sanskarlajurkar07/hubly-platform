function DeleteConfirmModal({ member, onClose, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container small" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body text-center">
          <p className="modal-text">
            this teammate will be deleted.
          </p>

          <div className="modal-actions">
            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => onConfirm(member._id)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;