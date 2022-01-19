import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/modal.css";

const UserList = ({ users, setIsModalShown, setSelectedUser }) => {
  const navigate = useNavigate();

  function handleNewUser() {
    setIsModalShown(true);
  }

  return (
    <ul>
      {users.map((user) => {
        return (
          <li key={user.id}>
            <button
              onClick={(e) => {
                  setSelectedUser(user)
                navigate(`/logged-in/`);
              }}
              className="user-selection"
            >
              <img
                className="avatar"
                width="50"
                height="50"
                src={user.avatar}
                alt=""
              />
              <h3>{user.firstName + " " + user.lastName}</h3>
            </button>
          </li>
        );
      })}

      <li>
        <button onClick={handleNewUser} className="user-selection">
          <h3>+ Add a new user</h3>
        </button>
      </li>
    </ul>
  );
};

export default UserList;
