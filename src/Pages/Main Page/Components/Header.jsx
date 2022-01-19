import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../Login page/Components/Modal";

const Header = ({
  user,
  setSelectedUser,
  showSettingsModal,
  setShowSettingsModal,
}) => {
    const navigate = useNavigate()
  return (
    <>
      {showSettingsModal && (
        <section
          onClick={(e) => {
            // @ts-ignore
            if (e.target.classList.contains("modal-wrapper")) {
              setShowSettingsModal((prevModal) => (prevModal = false));
            }
          }}
          className="modal-wrapper"
        >
          <div
            // onClick={e=>e.stopPropagation()}
            className="modal"
          >
            <h2
              onClick={(e) => {
                  navigate('/')
                setSelectedUser(null);

              }}
            >
              Log Out
            </h2>

            <button
              // @ts-ignore
              onClick={(e) => {
                setShowSettingsModal((prevModal) => (prevModal = false));
              }}
              className="close-modal-btn"
            >
              X
            </button>
          </div>
        </section>
      )}
      <header className="panel">
        <img
          className="avatar"
          width="50"
          height="50"
          src={user.avatar}
          alt=""
        />
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <button onClick={(e) => setShowSettingsModal(true)}>🔧</button>
      </header>
    </>
  );
};

export default Header;
