package com.website.ecommerce.dao;

import com.website.ecommerce.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Long> {

Page<Review> findByProductId(@RequestParam("product_id") Long productId, Pageable pageable);


Review findByUserEmailAndProductId(String userEmail, Long productId);

}
