import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
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
    SignUpPage,
  ChannelPage,
  Header,
  Footer,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <div className="home-container">
        <Header />
      </div>
      <div>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/image" element={<ImagePage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/trpg" element={<TrpgPage />} />
          <Route path="/channel" element={<ChannelPage />
          } />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </BrowserRouter>);
} export default App;
