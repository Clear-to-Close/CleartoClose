package web;

import data.Offer;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/offers", headers = "Accept=application/json")
public class OffersController {

    // Offer can be made, but authentication of the user needs to occur before US26/F2 is complete
    @PostMapping
    public void submitNewOffer(@RequestBody Offer newOffer) {
        System.out.printf("A new offer with the id of %d has been made!", newOffer.getId());
    }

    // Offer can be accepted upon, submit of a selection form; post updates the historical data of the selected offer
    @PostMapping
    public void acceptAnOffer(@RequestBody Offer acceptedOffer) {
        System.out.printf("The seller has accepted an offer with the id of %d!", acceptedOffer.getId());
    }
}
