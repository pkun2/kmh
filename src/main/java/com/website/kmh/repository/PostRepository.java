package com.website.kmh.repository;
import com.website.kmh.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // 기본적인 CRUD 메서드들이 자동으로 제공됩니다.
    // 필요한 경우 여기에 추가적인 쿼리 메서드들을 정의할 수 있습니다.
}