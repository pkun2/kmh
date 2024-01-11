package com.website.kmh.repository;

import com.website.kmh.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // 추가적인 메소드가 필요하다면 여기에 선언
}
