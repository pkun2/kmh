package com.website.kmh.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.DefaultSecurityFilterChain;

@Configuration
public class SecurityConfig {

    //@Bean
    //public PasswordEncoder passwordEncoder() {
    //    return new BCryptPasswordEncoder();
    //}

    @Configuration
    public static class MySecurityConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

        //private final PasswordEncoder passwordEncoder;

        //public MySecurityConfigurer(PasswordEncoder passwordEncoder) {
        //    this.passwordEncoder = passwordEncoder;
        //}

        @Override
        public void configure(HttpSecurity http) throws Exception {
            http
                    .csrf(AbstractHttpConfigurer::disable)
                    .authorizeHttpRequests(authorize  -> authorize
                            .requestMatchers("/", "/login", "/register").permitAll()
                            .anyRequest().authenticated()
                    )
                    .formLogin(form -> form
                            .loginPage("/login")
                            .defaultSuccessUrl("/", true)
                            .permitAll()
                    )
                    .logout(LogoutConfigurer::permitAll);
        }

    }
}

