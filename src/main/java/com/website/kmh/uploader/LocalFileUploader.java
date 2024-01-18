package com.website.kmh.uploader;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class LocalFileUploader {

    @Value("${upload.directory}")
    private String uploadDirectory;

    public String uploadFile(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            String filePath = uploadDirectory + File.separator + fileName;
            file.transferTo(new File(filePath));

            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
