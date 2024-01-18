package com.website.kmh.repository;

import com.website.kmh.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ImageRepository extends JpaRepository<Image, Long> {
}
