import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  APITestPage,
  HomePage,
  ImagePage,
  WritePage,
  LoginPage,
  NoticePage,
  ProfilePage,
  SearchPage,
  TrpgMain,
  TrpgMake,
  SignUpPage,
  ChannelPage,
  Header,
  Footer,
  ChannelPage, SignUpPage,
} from "./pages";

function App() {
  return (
      <BrowserRouter>
        <div className="home-container">
          <Header/>
        </div>
        <div>
          <Routes>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/image" element={<ImagePage/>}/>
            <Route path="/write" element={<WritePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/notice" element={<NoticePage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/trpg" element={<TrpgMain/>}/>
            <Route path="/trpg/make" element={<TrpgMake/>}/>
            <Route path="/apitest" element={<APITestPage/>}/>
            <Route path="/channel" element={<ChannelPage/>

            }/>
          </Routes>
        </div>
        <div>
          <Footer/>
        </div>
      </BrowserRouter>);
}

export default App;
