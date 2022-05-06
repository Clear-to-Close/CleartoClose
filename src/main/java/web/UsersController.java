package web;

import data.Listing;
import data.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {

    // Where was I going with this? Seems like an admin function
@GetMapping("{userId}")
    public Optional<User> getById(@PathVariable Long userId) {
    return null;
}

    // This would be more for user profile purposes; US22/F2?
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



@PostMapping
    public void submitNewOffer(@RequestBody Offer newOffer) {
    System.out.printf("A new offer with the id of %d has been made!", newOffer.getId());
}
}
