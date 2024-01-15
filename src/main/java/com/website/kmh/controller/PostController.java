//package com.website.kmh.controller;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class PostController {
//
//    @GetMapping("/api/posts")
//    public UserResponse getUser(
//            @RequestParam String nickname,
//            @RequestParam String email,
//            @RequestParam String password) {
//        return new UserResponse(nickname, email, password);
//    }
//
//    static class UserResponse {
//        private String nickname;
//        private String email;
//        private String password;
//
//        public UserResponse(String nickname, String email, String password) {
//
//        }
//
//        public String getNickname() {
//            return nickname;
//        }
//
//        public void setNickname(String nickname) {
//            this.nickname = nickname;
//        }
//
//        public String getEmail() {
//            return email;
//        }
//
//        public void setEmail(String email) {
//            this.email = email;
//        }
//
//        public String getPassword() {
//            return password;
//        }
//
//        public void setPassword(String password) {
//            this.password = password;
//        }
//    }
//}
