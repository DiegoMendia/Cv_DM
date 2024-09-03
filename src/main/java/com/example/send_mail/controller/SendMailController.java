package com.example.send_mail.controller;

import com.example.send_mail.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class SendMailController {

    @Autowired
    private MailService mailService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

}
