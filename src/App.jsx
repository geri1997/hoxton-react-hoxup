import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route index element={<Navigate replace to={'/login'}/>}/>
      <Route path={''} element={}/>

    </Routes>
  );
}
