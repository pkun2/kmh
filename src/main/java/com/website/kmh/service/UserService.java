package com.website.kmh.service;

import com.website.kmh.exception.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.website.kmh.domain.User;
import com.website.kmh.repository.UserRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManagerBuilder authenticationManagerBuilder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    public void createUser(String nickname, String email, String password) {
        try {
            // 사용자가 이미 존재하는지 확인
            if (userRepository.existsByEmail(email)) {
                throw new UserAlreadyExistsException("해당 이메일 주소로 이미 가입된 사용자가 있습니다.");
            }

            // 사용자가 존재하지 않으면 새로운 사용자 생성
            User newUser = new User();
            newUser.setNickname(nickname);
            newUser.setEmail(email);
            newUser.setPassword(passwordEncoder.encode(password));

            userRepository.save(newUser);

        } catch (UserAlreadyExistsException e) {
            // 이미 가입된 사용자 예외 처리
            // 원하는 방식으로 처리하거나 예외를 다시 던지거나 로깅 등을 수행합니다.
            // 여기서는 간단하게 로그만 출력하도록 했습니다.
            System.out.println("이미 가입된 사용자: " + e.getMessage());

        } catch (Exception e) {
            // 그 외의 예외 처리
            // 원하는 방식으로 처리하거나 예외를 다시 던지거나 로깅 등을 수행합니다.
            // 여기서는 간단하게 로그만 출력하도록 했습니다.
            System.out.println("사용자 생성 중 오류 발생: " + e.getMessage());
        }
    }



    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByEmail(email);

        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles("USER")
                .build();
    }

    public User getUserById(long id) {
        Optional<User> userOptional = userRepository.findById(id);

        // ID에 해당하는 사용자가 없는 경우, 예외를 발생시킵니다.
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with id: " + id);
        }

        // ID에 해당하는 사용자를 반환합니다.
        return userOptional.get();
    }

}
