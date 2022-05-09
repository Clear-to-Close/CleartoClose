package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.Listing;
import com.codeup.cleartoclose.data.ListingsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/listings", headers = "Accept=application/json")
public class ListingsController {

    private final ListingsRepository listingRepository;

    public ListingsController(ListingsRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    // This would be more for user profile purposes; US22/F2? or US21/F3
    @GetMapping
    public List<Listing> getAllListings() {
        return listingRepository.findAll();
    }

    // Will return a single listing with all information; US19/F2 As an auth user, I can see all listing information
    @GetMapping("{listingId}")
    public Listing getListingById(@PathVariable Long listingId) {
        return listingRepository.getById(listingId);
    }

    // TODO: to accept an offer a method has to be written here changing the active status from "yes" to "no"
    @PutMapping("{listingId}")
    public void acceptOffer(@PathVariable Long listingId) {
        Listing updateListing = listingRepository.getById(listingId);
        updateListing.setBuyerId(updateListing.getBuyerId());
        updateListing.setBuyerAgentId(updateListing.getBuyerAgentId());
        updateListing.setActive(updateListing.getActive());
        listingRepository.save(updateListing);
    }

}
