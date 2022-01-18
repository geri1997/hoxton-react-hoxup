import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login page/Login";

export default function App() {
  return (
    <Routes>
      <Route index element={<Navigate replace to={"/login"} />} />
      <Route path={'/login'} element={<Login />} />
      {/* <Route path={'/logged-in'} element={<MainApp />}/> */}
      {/* <Route path={"/logged-in/:id"} element={<Conversation />} /> */}
    </Routes>
  );
}
