
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navvy/NavBar.js";
import { ClassmatesList } from "./components/classmates/ListClassmates.js";
import { UserDetails } from "./components/classmates/DetailsClassmates.js";
import { UserProfile } from "./components/classmates/Profile.js";
import { AllSentMessages } from "./components/messages/AllSentMessages.js";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews.js";


export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
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
          <Route path=":userId/sent" element={<AllSentMessages />} />
        </Route>
      </Route>

          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />

    </Routes>
  );
};
