package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.Offer;
import com.codeup.cleartoclose.data.OffersRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/offers", headers = "Accept=application/json")
public class OffersController {

    private final OffersRepository offersRepository;

    public OffersController(OffersRepository offersRepository) {
        this.offersRepository = offersRepository;
    }


    @GetMapping
    public List<Offer> getAllOffers() {
        return offersRepository.findAll();
    }

    @GetMapping("{offerId}")
    public Optional<Offer> getOfferById(@PathVariable Long offerId) {
        return offersRepository.findById(offerId);
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
    public void offerAccepted(@PathVariable Long offerId, @RequestBody Offer updateOffer) {
        // update (05/09/22): refactored to accept OffersRepository methods by still need auth to complete the method
        Offer acceptedOffer = offersRepository.getById(offerId);
        acceptedOffer.setOfferor(updateOffer.getOfferor());
        acceptedOffer.setListing(updateOffer.getListing());
        acceptedOffer.setOfferAmount(updateOffer.getOfferAmount());
        acceptedOffer.setHomeWarranty(updateOffer.getHomeWarranty());
        acceptedOffer.setClosingCosts(updateOffer.getClosingCosts());
        acceptedOffer.setOptionLength(updateOffer.getOptionLength());
        acceptedOffer.setAppraisalWaiver(updateOffer.getAppraisalWaiver());
        acceptedOffer.setSurvey(updateOffer.getSurvey());
        acceptedOffer.setLoanType(updateOffer.getLoanType());
        acceptedOffer.setClosingDate(updateOffer.getClosingDate());
        acceptedOffer.setAcceptanceDate(updateOffer.getAcceptanceDate());
        offersRepository.save(acceptedOffer);
        System.out.printf("The seller has accepted an offer with the id of %d!", acceptedOffer.getId());
    }
}
