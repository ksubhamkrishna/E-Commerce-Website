package com.website.ecommerce.controller;

import com.website.ecommerce.entity.Product;
import com.website.ecommerce.responsemodels.ShelfCurrentLoansResponse;
import com.website.ecommerce.service.ProductService;
import com.website.ecommerce.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value="Authorization") String token) throws Exception{
        String userEmail = ExtractJWT.payLoadStringJWTExtraction(token, "\"sub\"");
        return productService.currentLoans(userEmail);
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token){
        String userEmail = ExtractJWT.payLoadStringJWTExtraction(token,"\"sub\"");
        return productService.currentLoansCount(userEmail);
    }


    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutByUser(@RequestHeader(value = "Authorization") String token,@RequestParam Long productId){
        String userEmail = ExtractJWT.payLoadStringJWTExtraction(token,"\"sub\"");

        //String userEmail = "testuser@email.com";
        return productService.checkoutProductByUser(userEmail, productId);

    }

    @PutMapping("/secure/checkout")
    public Product checkoutProduct(@RequestHeader(value = "Authorization") String token,@RequestParam Long productId) throws Exception{

        String userEmail = ExtractJWT.payLoadStringJWTExtraction(token,"\"sub\"");

        return productService.checkoutProduct(userEmail, productId);

    }

    @PutMapping("/secure/return")
    public void returnProduct(@RequestHeader(value = "Authorization") String token,
                              @RequestParam Long productId) throws Exception{

        String userEmail = ExtractJWT.payLoadStringJWTExtraction(token, "\"sub\"");
        productService.returnProduct(userEmail, productId);
    }

}
