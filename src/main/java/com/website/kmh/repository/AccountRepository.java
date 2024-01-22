package com.website.kmh.repository;

import com.website.kmh.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByEmail(String email); // user를 기준으로 유저를 조회할 때 권한정보도 가져온다.
    boolean existsByEmail(String email);

    Optional<Account> findByNickname(String nickname);
}
