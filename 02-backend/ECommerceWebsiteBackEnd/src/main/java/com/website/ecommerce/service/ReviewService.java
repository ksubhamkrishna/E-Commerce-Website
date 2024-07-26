package com.website.ecommerce.service;

import com.website.ecommerce.dao.ProductRepository;
import com.website.ecommerce.dao.ReviewRepository;
import com.website.ecommerce.entity.Review;
import com.website.ecommerce.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {

        this.reviewRepository = reviewRepository;

    }

    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndProductId(userEmail, reviewRequest.getProductId());
        if (validateReview != null) {
            throw new Exception("review already created");
        }

        Review review = new Review();
        review.setProductId(reviewRequest.getProductId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);

        if (reviewRequest.getReviewDescription().isPresent()) {
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);

    }

    public Boolean userReviewListed(String userEmail, Long productId) {
        Review validateReview = reviewRepository.findByUserEmailAndProductId(userEmail, productId);
        if(validateReview != null){
            return true;
        }else{
            return false;
        }

    }
}