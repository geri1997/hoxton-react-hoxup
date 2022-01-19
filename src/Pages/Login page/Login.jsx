import React, {useState } from "react";
import Modal from "./Components/Modal";
import UserList from "./Components/UserList";

const Login = ({setUsers, users, setSelectedUser}) => {
  const [isModalShown, setIsModalShown] = useState(false)


  

  return (
      <>{isModalShown&& <Modal setUsers={setUsers} setIsModalShown={setIsModalShown}/>}
    <div className="main-wrapper login">
      <section className="login-section">
        <h2>Choose your user!</h2>
        <UserList setIsModalShown={setIsModalShown} setSelectedUser={setSelectedUser} users={users}/>
      </section>
    </div>
    </>
  );
};

export default Login;
