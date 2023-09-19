import { Outlet, Route, Routes } from "react-router-dom";
import { ClassmatesList } from "./components/classmates/ListClassmates.js";
import "./App.css";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Outlet />
            {/* <NavBar />
             */}
          </>
        }
      >
        <Route index element={<ClassmatesList />} />
        <Route path="users">
          <Route path=":userId" element={<userDetails />} />
          {/* <Route path=":userId/edit" element={<EditProfile />} />           */}
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
