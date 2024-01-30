package com.website.kmh.service;

import com.website.kmh.vo.EmailVO;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender javaMailSender;

    private static final String senderEmail= "jhy9732@naver.com";

    public void CreateMail(EmailVO emailVO){

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailVO.getReceiver());
        message.setFrom(senderEmail);
        message.setSubject(emailVO.getTitle());
        message.setText(emailVO.getContent());

        javaMailSender.send(message);
    }

}
