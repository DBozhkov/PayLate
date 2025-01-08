//package com.paylateapp.repository;
//
//import com.paylateapp.entity.Review;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.web.bind.annotation.RequestParam;
//
//public interface ReviewRepository extends JpaRepository<Review, Long> {
//
//    Page<Review> findByProductId(@RequestParam("product_id") Long bookId,
//                              Pageable pageable);
//
//    Review findByUserEmailAndProductId(String userEmail, Long productId);
//
//    @Modifying
//    @Query("delete from Review r where p.productId = :productId")
//    void deleteAllByBookId(@Param("productId") Long productId);
//}