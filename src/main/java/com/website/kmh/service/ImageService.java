package com.website.kmh.service;

import com.website.kmh.uploader.SshFileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ImageService {
    String uploadImage(MultipartFile file);
}
