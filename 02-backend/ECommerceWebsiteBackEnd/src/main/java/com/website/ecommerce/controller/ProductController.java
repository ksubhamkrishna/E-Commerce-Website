package com.website.ecommerce.controller;

import com.website.ecommerce.entity.Product;
import com.website.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(){
        String userEmail = "testuser@email.com";
        return productService.currentLoansCount(userEmail);
    }


    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutByUser(@RequestParam Long productId){
        String userEmail = "testuser@email.com";
        return productService.checkoutProductByUser(userEmail, productId);

    }

    @PutMapping("/secure/checkout")
    public Product checkoutProduct(@RequestParam Long productId) throws Exception{

        String userEmail = "testuser@email.com";

        return productService.checkoutProduct(userEmail, productId);

    }



}
