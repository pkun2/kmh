//package com.website.kmh.service;
//import com.website.kmh.domain.Post;
//import com.website.kmh.repository.PostRepository;
//import com.website.kmh.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import java.util.List;
//
//@Service
//public class PostService {
//    @Autowired
//    private PostRepository postRepository;
//
//    @Autowired
//    public PostService(PostRepository postRepository) {
//        this.postRepository = postRepository;
//    }
//
//    public List<Post> getAllPosts() {
//        return postRepository.findAll();
//    }
//}
