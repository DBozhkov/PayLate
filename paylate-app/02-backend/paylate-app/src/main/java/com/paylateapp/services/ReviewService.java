//package com.paylateapp.services;
//
//
//import com.paylateapp.entity.Product;
//import com.paylateapp.entity.Review;
//import com.paylateapp.repository.ProductRepository;
//import com.paylateapp.repository.ReviewRepository;
//import com.paylateapp.requestmodels.ReviewRequest;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.sql.Date;
//import java.time.LocalDate;
//
//@Service
//@Transactional
//public class ReviewService {
//
//    private ReviewRepository reviewRepository;
//    private ProductRepository productRepository;
//
//    @Autowired
//    public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository) {
//        this.reviewRepository = reviewRepository;
//        this.productRepository = productRepository;
//    }
//
//    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
//        Review validateReview = reviewRepository.findByUserEmailAndProductId(userEmail, reviewRequest.getProductId());
//
//        if (validateReview != null) {
//            throw new Exception("Review already created!");
//        }
//
//        Product product = productRepository.findById(reviewRequest.getProductId())
//                .orElseThrow(() -> new Exception("Product not found!"));
//
//        Review review = new Review();
//        review.setProduct(product);
//        review.setRating(reviewRequest.getRating());
//        review.setUserEmail(userEmail);
//        if (reviewRequest.getReviewDescription().isPresent()) {
//            review.setReviewDescription(reviewRequest.getReviewDescription().map(
//                    Object::toString
//            ).orElse(null));
//        }
//        review.setDate(Date.valueOf(LocalDate.now()));
//        reviewRepository.save(review);
//    }
//
//    public Boolean userReviewListed(String userEmail, Long productId) {
//        Review validateReview = reviewRepository.findByUserEmailAndProductId(userEmail, productId);
//
//        if (validateReview != null) {
//            return true;
//        } else {
//            return false;
//        }
//    }
//}