//package com.paylateapp.controllers;
//
//
//import com.paylateapp.Utils.JWTExtractor;
//import com.paylateapp.requestmodels.ReviewRequest;
//import com.paylateapp.services.ReviewService;
//import org.springframework.web.bind.annotation.*;
//
//@CrossOrigin("https://localhost:3000")
//@RestController
//@RequestMapping("/api/reviews")
//public class ReviewController {
//
//    private ReviewService reviewService;
//
//    public ReviewController(ReviewService reviewService) {
//        this.reviewService = reviewService;
//    }
//
//    @GetMapping("/secure/user/product")
//    public Boolean reviewBookByUser(@RequestHeader(value = "Authorization") String token,
//                                    @RequestParam Long bookId) throws Exception {
//        String userEmail = JWTExtractor.payloadJWTExtraction(token, "\"sub\"");
//
//        if (userEmail == null) {
//            throw new Exception("User email is missing!");
//        }
//
//        return reviewService.userReviewListed(userEmail, bookId);
//    }
//
//    @PostMapping("/secure")
//    public void postReview(@RequestHeader(value = "Authorization") String token,
//                           @RequestBody ReviewRequest reviewRequest) throws Exception {
//
//        String userEmail = JWTExtractor.payloadJWTExtraction(token, "\"sub\"");
//        if (userEmail == null) {
//            throw new Exception("User email is missing");
//        }
//
//        reviewService.postReview(userEmail, reviewRequest);
//    }
//}
