import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login page/Login";
import MainApp from "./Pages/Main Page/MainApp";

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)

  //fetch users from server
  useEffect(() => {
    fetch("http://localhost:4000/users?_embed=conversations")
      .then((resp) => resp.json())
      .then((serverUsers) => setUsers(serverUsers));
  }, []);

  return (
    <Routes>
      <Route index element={<Navigate replace to={"/login"} />} />
      <Route
        path={"/login"}
        element={<Login setUsers={setUsers} setSelectedUser={setSelectedUser} users={users} />}
      />
      <Route path={"/logged-in"} element={<MainApp user={selectedUser} users={users}/>} />
      {/* <Route path={"/logged-in/:id"} element={<h1>test</h1>} /> */}
    </Routes>
  );
}
