import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  APITestPage,
  HomePage,
  WritePage,
  LoginPage,
  PostPage,
  PostDetailPage,
  NoticePage,
  ProfilePage,
  TrpgMain,
  TrpgMake,
  MainSearchPage,
  SignUpPage,
  ChannelPage,
  CreateChannelPage,
  Header,
  Footer,
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
              <Route path=":channelName/write" element={<WritePage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path=":channelName" element={<PostPage />} />
              <Route path=":channelName/:postId" element={<PostDetailPage />} />
              <Route path="/signup" element={<SignUpPage/>}/>
              <Route path="/notice" element={<NoticePage/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
              <Route path="/search" element={<MainSearchPage/>}/>
              <Route path="/trpg" element={<TrpgMain/>}/>
              <Route path="/trpg/make" element={<TrpgMake/>}/>
              <Route path="/apitest" element={<APITestPage/>}/>
              <Route path="/channel" element={<ChannelPage/>}/>
              <Route path="/createChannel" element={<CreateChannelPage/>}/>
            </Routes>
          </div>
          <div>
            <Footer/>
          </div>
        </BrowserRouter>
      );
}

export default App;
