package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.*;
import com.codeup.cleartoclose.dto.MakeOfferDTO;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/offers", headers = "Accept=application/json")
public class
OffersController {

    private final OffersRepository offersRepository;
    public final ListingsRepository listingsRepository;
    private final UsersRepository usersRepository;

    public OffersController(OffersRepository offersRepository, ListingsRepository listingsRepository, UsersRepository usersRepository) {
        this.offersRepository = offersRepository;
        this.listingsRepository = listingsRepository;
        this.usersRepository = usersRepository;
    }

    @GetMapping
    public List<Offer> getAllOffers() {
        return offersRepository.findAll();
    }

    @GetMapping("{offerId}")
    public Optional<Offer> getOfferById(@PathVariable Long offerId) {
        return offersRepository.findById(offerId);
    }

    @GetMapping("/findOffers/{listingId}")
    public Collection<Offer> getAllOffersById(@PathVariable long listingId) {
        return offersRepository.findByListing(listingsRepository.findById(listingId));
    }

    @GetMapping("/findOffersByUser/{userId}")
    public Collection<Offer> getAllOffersByUser(@PathVariable long userId) {
        return offersRepository.findByOfferor(usersRepository.findById(userId));
    }

    // Offer can be made, but authentication of the user needs to occur before US26/F2 is complete
    @PostMapping
    public void submitNewOffer(@RequestBody MakeOfferDTO newOfferDTO) {
        // update (05/09/22): refactored to accept OffersRepository methods by still need auth to complete the method

//        User offeror = usersRepository.getById(id);
        Offer newOffer = new Offer();

        newOffer.setOfferAmount(newOfferDTO.getOfferAmount());
        newOffer.setLoanType(newOfferDTO.getLoanType());
        newOffer.setOptionLength(newOfferDTO.getOptionLength());
        newOffer.setSurvey(newOfferDTO.getSurvey());
        newOffer.setHomeWarranty(newOfferDTO.getHomeWarranty());
        newOffer.setAppraisalWaiver(newOfferDTO.getAppraisalWaiver());
        newOffer.setClosingCosts(newOfferDTO.getClosingCosts());
        newOffer.setClosingDate(newOfferDTO.getClosingDate());
        newOffer.setOfferStatus(OfferStatus.ACTIVE);

        User newOfferor = usersRepository.getById(newOfferDTO.getOfferorId());
        newOffer.setOfferor(newOfferor);

        Listing currentListing = listingsRepository.getById(newOfferDTO.getListingId());
        System.out.println(currentListing);
        newOffer.setListing(currentListing);

        offersRepository.save(newOffer);
    }

    // Offer can be accepted upon, submit of a selection form; post updates the historical data of the selected offer
    @PutMapping("{offerId}")
    public void offerAccepted(@PathVariable Long offerId) {
        // update (05/09/22): refactored to accept OffersRepository methods by still need auth to complete the method
        Offer acceptedOffer = offersRepository.findById(offerId).get();
        acceptedOffer.setOfferStatus(OfferStatus.ACCEPTED);
        offersRepository.save(acceptedOffer);
        System.out.printf("The seller has accepted an offer with the id of %d!", acceptedOffer.getId());
    }
  
    @PutMapping("/decline/{offerId}")
    public void offerDeclined(@PathVariable Long offerId) {
        // update (05/09/22): refactored to accept OffersRepository methods by still need auth to complete the method
        Offer acceptedOffer = offersRepository.findById(offerId).get();
        acceptedOffer.setOfferStatus(OfferStatus.DECLINED);
        offersRepository.save(acceptedOffer);
    }
}
