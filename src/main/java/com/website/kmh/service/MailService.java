package com.website.kmh.service;

import com.website.kmh.vo.EmailVO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Random;


@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender javaMailSender;
    private final CacheManager cacheManager;
    private static final String senderEmail = "rjendld2000@gmail.com";
    private static final String AUTH_CODE_CACHE_NAME = "authCodeCache";

    public String makeRandomNumber() {
        Random r = new Random();
        StringBuilder s = new StringBuilder();
        for(int i = 0; i < 6; i++) {
            int n = r.nextInt(62);
            char c;
            if(n < 10) {
                c = (char)(n + 48);
            } else if((n >= 10) && (n < 36)) {
                c = (char)(n + 87);
            } else {
                c = (char)(n + 29);
            }
            s.append(c);
        }

        return s.toString();
    }

    public void createMail(EmailVO emailVO) throws MessagingException {
        String authCode = makeRandomNumber();
        if(getCachedAuthCode(emailVO.getReceiver()) != null) {
            evictCachedAuthCode(emailVO.getReceiver());
        }
        cacheAuthCode(emailVO, authCode);
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        String content = "<h3>요청하신 인증번호 :</h3>";
        content += "<h1>" + authCode + "</h1>";
        content += "<h3>인증 방법에 대한 설명 기재</h3>";

        helper.setText(content, true);
        helper.setTo(emailVO.getReceiver());
        helper.setSubject("테스트 인증 요청");
        helper.setFrom(senderEmail);

        javaMailSender.send(message);
    }

    private void cacheAuthCode(EmailVO emailVO, String authCode) {
        Objects.requireNonNull(cacheManager.getCache(AUTH_CODE_CACHE_NAME)).put(emailVO.getReceiver(), authCode);
    }

    @Cacheable(value = AUTH_CODE_CACHE_NAME)
    public String getCachedAuthCode(String email) {
        Cache.ValueWrapper valueWrapper = Objects.requireNonNull(cacheManager.getCache(AUTH_CODE_CACHE_NAME)).get(email);
        return (valueWrapper != null) ? (String) valueWrapper.get() : null;
    }

    @CacheEvict(value = AUTH_CODE_CACHE_NAME)
    public void evictCachedAuthCode(String email) {
        Objects.requireNonNull(cacheManager.getCache(AUTH_CODE_CACHE_NAME)).evict(email);
    }
}
