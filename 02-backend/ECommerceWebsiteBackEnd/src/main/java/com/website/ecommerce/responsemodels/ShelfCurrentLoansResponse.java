package com.website.ecommerce.responsemodels;

import com.website.ecommerce.entity.Product;
import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {

public ShelfCurrentLoansResponse(Product product,int daysLeft){

    this.product = product;
    this.daysLeft = daysLeft;
}

private Product product;

private int daysLeft;

}
