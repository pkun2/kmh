package com.website.kmh.service;

import com.website.kmh.domain.Image;
import com.website.kmh.repository.ImageRepository;
import com.website.kmh.uploader.SshFileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

    @Autowired
    private SshFileUploader sshFileUploader;

    @Autowired
    private ImageRepository imageRepository; // DB 저장을 위한 JPA Repository

    public String uploadImage(MultipartFile file) {
        // SSH를 통해 이미지를 서버에 업로드하고, 이미지의 URL을 반환합니다.
        String imageUrl = sshFileUploader.uploadFile(file);

        // 웹 서버의 호스트와 포트, 이미지의 이름을 사용하여 이미지의 URL을 생성합니다.
        String webUrl = "http://218.155.183.116:81/" + file.getOriginalFilename();

        // DB에 웹 URL을 저장합니다.
        saveImageUrlToDB(webUrl);

        return webUrl;
    }

    public void saveImageUrlToDB(String imageUrl) {
        Image image = new Image(); // DB에 저장할 Image Entity
        image.setUrl(imageUrl);
        imageRepository.save(image); // DB에 이미지 URL 저장
    }
}
