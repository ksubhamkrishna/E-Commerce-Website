package com.website.ecommerce.dao;

import com.website.ecommerce.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessagesRepository extends JpaRepository<Message,Long> {



}
