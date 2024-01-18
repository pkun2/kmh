package com.website.kmh.controller;

import com.website.kmh.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("upload") MultipartFile file) {
        String imageUrl = imageService.uploadImage(file);
        Map<String, String> response = new HashMap<>();
        response.put("url", imageUrl);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
