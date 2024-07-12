package com.website.ecommerce.service;

import com.website.ecommerce.dao.CheckoutRepository;
import com.website.ecommerce.dao.ProductRepository;
import com.website.ecommerce.entity.Checkout;
import com.website.ecommerce.entity.Product;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class ProductService {

    private ProductRepository productRepository;

    private CheckoutRepository checkoutRepository;

    public ProductService(ProductRepository productRepository, CheckoutRepository checkoutRepository){
            this.productRepository = productRepository;
            this.checkoutRepository = checkoutRepository;

    }

    public Product checkoutProduct(String userEmail, Long productId) throws Exception{
        Optional<Product> product = productRepository.findById(productId);

        Checkout validateCheckout  = checkoutRepository.findByUserEmailAndProductId(userEmail, productId);

        if(!product.isPresent() || validateCheckout != null || product.get().getQuantityAvailable()<=0){
            throw new Exception("Product doesn't exist or already checked out by user");
        }

    }



}



