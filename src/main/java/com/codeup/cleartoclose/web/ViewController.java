package com.codeup.cleartoclose.web;

import org.springframework.web.bind.annotation.RequestMapping;

public class ViewController {
    @RequestMapping({"/", "/login", "/listing", "/realtorListing", "/makeOffer", "/offers"})
    public String showView() {
        return "forward:/index.html";
    }
}
