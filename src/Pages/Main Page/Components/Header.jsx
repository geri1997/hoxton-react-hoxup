import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../Login page/Components/Modal";

const Header = ({
  user,
  setSelectedUser,
  showSettingsModal,
  setShowSettingsModal,
  setSelectedConvo,
}) => {
  const navigate = useNavigate();
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
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                navigate("/");
                setSelectedUser(null);
                setSelectedConvo(null);
              }}
            >
              Log Out
            </h2>
            <h2
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                navigate("/");
                setSelectedUser(null);
                setSelectedConvo(null);
                fetch("http://localhost:4000/users/"+user.id, { method: "DELETE" });
              }}
            >
              Delete Account
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
