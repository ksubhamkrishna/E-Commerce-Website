package com.website.ecommerce.dao;

import com.website.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    Page<Product> findByCategory(@RequestParam("category") String category, Pageable pageable);

    @Query("select o from Product o where id in :product_ids")
    List<Product> findProductsByProductIds(@Param("product_ids")List<Long> productId);

}
