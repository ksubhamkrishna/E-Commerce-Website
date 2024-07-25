package com.website.ecommerce.controller;

import com.website.ecommerce.requestmodels.ReviewRequest;
import com.website.ecommerce.service.ReviewService;
import com.website.ecommerce.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;


    @CrossOrigin("http://localhost:3000")
    @RestController
    @RequestMapping("/api/reviews")
    public class ReviewController{

        private ReviewService reviewService;

        public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/user/product")
    public Boolean reviewProductByUser(@RequestHeader(value = "Authorization" ) String token,
                                       @RequestParam Long productId) throws Exception{

           String userEmail = ExtractJWT.payLoadStringJWTExtraction(token, "\"sub\"");

           if(userEmail== null){
               throw new Exception("User email is missing");
           }
           return reviewService.userReviewListed(userEmail, productId);
    }

    @PostMapping("/secure")
       public void postReview(@RequestHeader(value = "Authorization") String token, @RequestBody ReviewRequest reviewRequest) throws Exception {

        String userEmail = ExtractJWT.payLoadStringJWTExtraction(token, "\"sub\"");
        if(userEmail == null) {
            throw new Exception("User email is missing");
        }

        reviewService.postReview(userEmail, reviewRequest);

        }
    }

