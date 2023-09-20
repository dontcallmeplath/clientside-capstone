import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navvy/NavBar.js";
import { ClassmatesList } from "./components/classmates/ListClassmates.js";
import { UserDetails } from "./components/classmates/DetailsClassmates.js";
import { UserProfile } from "./components/classmates/Profile.js";
import "./App.css";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<ClassmatesList />} />
        <Route path="users">
          <Route path=":userId" element={<UserDetails />} />
          {/* <Route path=":userId/edit" element={<EditProfile />} />           */}
          <Route path=":userId/profile" element={<UserProfile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
