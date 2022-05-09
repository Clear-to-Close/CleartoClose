package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.Address;
import com.codeup.cleartoclose.data.Listing;
import com.codeup.cleartoclose.data.ListingsRepository;
import com.codeup.cleartoclose.data.UsersRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/listings", headers = "Accept=application/json")
public class ListingsController {

    private final ListingsRepository listingRepository;
    private final UsersRepository usersRepository;

    public ListingsController(ListingsRepository listingRepository, UsersRepository usersRepository) {
        this.listingRepository = listingRepository;
        this.usersRepository = usersRepository;
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

    @PostMapping
    public void createListing(@RequestBody Address newAdderess, @RequestParam String sellerEmail, @RequestParam String sellerAgentEmail,
                              @RequestParam(required = false) String buyersEmail, @RequestParam(required = false) String buyersAgentEmail) {

        Listing newListing = new Listing();
        newListing.setSeller(usersRepository.findByEmail(sellerEmail));
        newListing.setSellerAgent(usersRepository.findByEmail(sellerAgentEmail));
        newListing.setBuyer(usersRepository.findByEmail(buyersEmail));
        newListing.setBuyerAgent(usersRepository.findByEmail(buyersAgentEmail));
        newListing.setListingAddress(newAdderess);
        listingRepository.save(newListing);
    }


    // TODO: to accept an offer a method has to be written here changing the active status from "yes" to "no"
    @PutMapping("{listingId}")
    public void acceptOffer(@PathVariable Long listingId) {
        Listing updateListing = listingRepository.getById(listingId);
        updateListing.setBuyer(updateListing.getBuyer());
        updateListing.setBuyerAgent(updateListing.getBuyerAgent());
        updateListing.setActive(updateListing.getActive());
        listingRepository.save(updateListing);
    }

}
