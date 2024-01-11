import React from "react";

import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { LoginPage } from "./pages";

function App() {
  return (
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>);
} export default App;
