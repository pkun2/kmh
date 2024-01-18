package com.website.kmh.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long image_id;
    private String image_url;

    public void setUrl(String imageUrl) {
        this.image_url = imageUrl;
    }
}
