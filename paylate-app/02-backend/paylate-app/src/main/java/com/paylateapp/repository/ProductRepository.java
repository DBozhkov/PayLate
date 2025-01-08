package com.paylateapp.repository;

import com.paylateapp.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByProductNameContaining(@RequestParam("productName") String productName, Pageable pageable);

    Page<Product> findByCategory(@RequestParam("category") String category, Pageable pageable);

//    @Query("select o from Book o where id in :book_ids")
//    List<Book> findBooksByBookIds (@Param("book_ids") List<Long> bookId);
}
