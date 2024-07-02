package com.website.ecommerce.entity;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "products")
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name ="title" )
    private String title;

    @Column(name = "seller")
    private String seller;

    @Column(name = "description")
    private String description;

    @Column(name = "quantities")
    private int quantities;

    @Column(name = "quantity_available")
    private int quantityAvailable;

    @Column(name = "category")
    private String category;

    @Column(name = "img")
    private String img;


}
