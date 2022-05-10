package com.codeup.cleartoclose.web;

import org.springframework.web.bind.annotation.RequestMapping;

public class ViewController {
    @RequestMapping({"/", "/login", "/listing", "/realtorListing"})
    public String showView() {
        return "forward:/index.html";
    }
}
