import React from "react";
import "./UserProfileModal.css";

function UserProfileModal({
  show,
  onClose,
  handleInputChange,
  handleSaveChanges,
}) {
  if (!show) {
    return null;
  }

  return (
    <>
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <button onClick={onClose}>Close</button>
          </div>
          <div className="modal-body">
            <h2>Edit Profile</h2>
            <form className="edit-profile-form">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={name.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={username.username}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={address.address}
                  onChange={handleInputChange}
                />
              </label>
              <div className="modal-buttons">
                <button type="button" onClick={onClose}>
                  Close
                </button>
                <button type="button" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileModal;

{
  /* <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  contentLabel="Edit Profile"
  className="modal"
  overlayClassName="overlay"
>
  <h2>Edit Profile</h2>
  <form className="edit-prodile-form">
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Username:
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Password:
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Address:
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
      />
    </label>
    <div className="modal-buttons">
      <button type="button" onClick={() => setIsModalOpen(false)}>
        Close
      </button>
      <button type="button" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  </form>
</Modal>; */
}
