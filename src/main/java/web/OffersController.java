package web;

import data.Offer;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/offers", headers = "Accept=application/json")
public class OffersController {

    @PostMapping
    public void submitNewOffer(@RequestBody Offer newOffer) {
        System.out.printf("A new offer with the id of %d has been made!", newOffer.getId());
    }
}
