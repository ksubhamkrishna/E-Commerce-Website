package com.website.ecommerce.service;


import com.website.ecommerce.dao.ProductRepository;
import com.website.ecommerce.dao.ReviewRepository;
import com.website.ecommerce.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ReviewService {

    private ProductRepository productRepository;

    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ProductRepository productRepository, ReviewRepository reviewRepository){

       this.productRepository = productRepository;
       this.reviewRepository = reviewRepository;

    }

    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception{
        Review validateReview = reviewRepository.findByUserEmailAndProductId((userEmail, reviewRequest.getProductId());
    }
}
