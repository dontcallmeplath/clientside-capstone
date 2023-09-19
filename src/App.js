import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {/* <NavBar />
            <Outlet /> */}
          </>
        }
      ></Route>
    </Routes>
  );
};

export default App;
