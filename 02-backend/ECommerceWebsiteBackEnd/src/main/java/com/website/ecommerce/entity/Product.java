package com.website.ecommerce.entity;


import javax.persistence.*;

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

    public Product() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantities() {
        return quantities;
    }

    public void setQuantities(int quantities) {
        this.quantities = quantities;
    }

    public int getQuantityAvailable() {
        return quantityAvailable;
    }

    public void setQuantityAvailable(int quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }




}
