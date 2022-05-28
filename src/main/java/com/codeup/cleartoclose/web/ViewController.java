package com.codeup.cleartoclose.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {
    @RequestMapping({"/", "/login", "/listing", "/realtorListing", "/makeOffer", "/offers","/register", "/allListings"})
    public String showView() {
        return "forward:/index.html";
    }
}
