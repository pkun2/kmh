package com.website.kmh.domain;
import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity(name = "posts")
public class Post {
    // id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // title
    private String title;

    // content
    private String content;

    // createdAt
    private LocalDateTime createdAt;

    // viewCount
    private Integer viewCount;

    // 생성자, getters 및 setters
    public Post() {
    }

    public Post(String title, String content, LocalDateTime createdAt, Integer viewCount) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.viewCount = viewCount;
    }

}
