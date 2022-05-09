package web;

import data.Offer;
import data.OffersRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/offers", headers = "Accept=application/json")
public class OffersController {

    private final OffersRepository offersRepository;

    public OffersController(OffersRepository offersRepository) {
        this.offersRepository = offersRepository;
    }


    // Offer can be made, but authentication of the user needs to occur before US26/F2 is complete

    @PostMapping
    public void submitNewOffer(@RequestBody Offer newOffer) {
        // update (05/09/22): refactored to accept OffersRepository methods by still need auth to complete the method
        offersRepository.save(newOffer);
        System.out.printf("A new offer with the id of %d has been made!", newOffer.getId());
    }

    // Offer can be accepted upon, submit of a selection form; post updates the historical data of the selected offer
    @PutMapping("{offerId}")
    public void offerAccepted(@PathVariable Long offerId) {
        // update (05/09/22): refactored to accept OffersRepository methods by still need auth to complete the method
        Offer acceptedOffer = offersRepository.getById(offerId);
        acceptedOffer.setAcceptanceDate(acceptedOffer.getAcceptanceDate());
        offersRepository.save(acceptedOffer);
        System.out.printf("The seller has accepted an offer with the id of %d!", acceptedOffer.getId());
    }
}
