import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./middlewares/ProtectRoute";
import LoginRoute from "./middlewares/LoginRoute";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Homepage />
            </ProtectRoute>
          }
        />
        <Route
          path="/login"
          element={
            <LoginRoute>
              <Login />
            </LoginRoute>
          }
        />
        <Route
          path="/register"
          element={
            <LoginRoute>
              <Register />
            </LoginRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
