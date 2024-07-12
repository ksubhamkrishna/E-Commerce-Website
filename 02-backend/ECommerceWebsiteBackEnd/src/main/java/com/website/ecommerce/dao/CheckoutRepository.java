package com.website.ecommerce.dao;

import com.website.ecommerce.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndProductId(String userEmail, Long productId);


}
