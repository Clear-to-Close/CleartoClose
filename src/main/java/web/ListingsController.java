package web;

import data.Listing;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/listings", headers = "Accept=application/json")
public class ListingsController {

    // This would be more for user profile purposes; US22/F2? or US21/F3
    @GetMapping
    public List<Listing> getAllListings() {
        return null;
    }

    // Will return a single listing with all information; US19/F2 As an auth user, I can see all listing information
    // TODO: Test by making listing object and return using this method
    @GetMapping("{listingId}")
    public Listing getListingById(@PathVariable Long listingId) {
        return null;
    }

}
