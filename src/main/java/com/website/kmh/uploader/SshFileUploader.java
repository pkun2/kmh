package com.website.kmh.uploader;

import com.jcraft.jsch.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;

import java.io.InputStream;

@Service
public class SshFileUploader {

    @Value("${ssh.host}")
    private String host;

    @Value("${ssh.port}")
    private int port;

    @Value("${ssh.user}")
    private String user;

    @Value("${ssh.password}")
    private String password;

    @Value("${ssh.remoteDiretory}")
    private String remoteDirectory;

    public String uploadFile(MultipartFile upload) {

        try {
            JSch jsch = new JSch();
            Session session = jsch.getSession(user, host, port);
            session.setPassword(password);
            session.setConfig("StrictHostKeyChecking", "no");
            session.connect();

            ChannelSftp channelSftp = (ChannelSftp) session.openChannel("sftp");
            channelSftp.connect();

            InputStream inputStream = upload.getInputStream();
            channelSftp.put(inputStream, remoteDirectory + upload.getOriginalFilename());

            inputStream.close();
            channelSftp.disconnect();
            session.disconnect();

            System.out.println("File uploaded successfully!");
            return "http://" + host + ":" + port + remoteDirectory + upload.getOriginalFilename();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
