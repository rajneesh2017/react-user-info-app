import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { UserContextProvider } from "./components/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <AppRoutes />
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
