package com.website.ecommerce.controller;

import com.website.ecommerce.entity.Message;
import com.website.ecommerce.service.MessagesService;
import com.website.ecommerce.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("api/messages")
public class MessagesController {

    private MessagesService messagesService;

    @Autowired
    public MessagesController(MessagesService messagesService){
        this.messagesService = messagesService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Message messageRequest){
        String userEmail = ExtractJWT.payLoadStringJWTExtraction(token, "\"sub\"");

        messagesService.postMessage(messageRequest,userEmail);
    }

}
