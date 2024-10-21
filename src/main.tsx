import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BadRequest } from "./routes/BadRequest.tsx";
import CreateFlightForm from "./components/CreateFlightForm/CreateFlightForm.tsx";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Signup } from "./components/Signup/Signup.tsx";
import { Login } from "./components/Login/Login.tsx";
import { AuthProvider } from "./components/global/AuthProvider/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <AuthProvider>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/bad-request" element={<BadRequest />} />
                <Route path="/create-flight" element={<CreateFlightForm />} />
                <Route
                  path="/edit-flight/:id"
                  element={<CreateFlightForm isEdit />}
                />
              </Routes>
            </AuthProvider>
          }
        />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>
);
