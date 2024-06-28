package com.website.ecommerce.ECommerceWebsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan(basePackages = "com.website.ecommerce")
@EntityScan("com.website.ecommerce.entity")
@EnableJpaRepositories(basePackages = "com.website.ecommerce.repo")
public class ECommerceWebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(ECommerceWebsiteApplication.class, args);
	}


}
