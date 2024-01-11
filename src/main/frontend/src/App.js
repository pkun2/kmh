import React from "react";

import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import {
  HomePage,
  ImagePage,
  WritePage,
  LoginPage,
  NoticePage,
  ProfilePage,
  SearchPage,
  TrpgPage,
  ChannelPage,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/image">Image</Link></li>
            <li><Link to="/write">Write</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/notice">Notice</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/trpg">Trpg</Link></li>
            <li><Link to="/channel">Channel</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/image" element={<ImagePage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/trpg" element={<TrpgPage /> } />
          <Route path="/channel" element={<ChannelPage />
          } />
        </Routes>
      </div>
    </BrowserRouter>);
} export default App;
