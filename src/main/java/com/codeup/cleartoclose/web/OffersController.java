package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.*;
import com.codeup.cleartoclose.dto.MakeOfferDTO;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Date;
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

    @PostMapping
    public void submitNewOffer(@RequestBody MakeOfferDTO newOfferDTO) {
        System.out.println(newOfferDTO.getListingId());
        Offer newOffer = new Offer();
        newOffer.setOfferAmount(newOfferDTO.getOfferAmount());
        newOffer.setLoanType(newOfferDTO.getLoanType());
        newOffer.setOptionLength(newOfferDTO.getOptionLength());
        newOffer.setSurvey(newOfferDTO.getSurvey());
        newOffer.setHomeWarranty(newOfferDTO.getHomeWarranty());
        newOffer.setAppraisalWaiver(newOfferDTO.getAppraisalWaiver());
        newOffer.setClosingCosts(newOfferDTO.getClosingCosts());
        newOffer.setClosingDate(newOfferDTO.getClosingDate());
        newOffer.setOfferStatus(newOfferDTO.getOfferStatus());


        User newOfferor = usersRepository.findByEmail(newOfferDTO.getOfferorEmail());
        newOffer.setOfferor(newOfferor);

        Listing currentListing = listingsRepository.findById(newOfferDTO.getListingId()).get();
        System.out.println(currentListing);
        newOffer.setListing(currentListing);

        offersRepository.save(newOffer);
        System.out.println(newOffer);
    }

    @PutMapping("editOffer/{offerId}")
    public void editOffer(@PathVariable long offerId, @RequestBody Offer updateOffer) {
        Offer offerToEdit = offersRepository.findById(offerId).get();
        System.out.println(offerToEdit);
        System.out.println(updateOffer);
        offerToEdit.setOfferAmount(updateOffer.getOfferAmount());
        offerToEdit.setLoanType(updateOffer.getLoanType());
        offerToEdit.setOptionLength(updateOffer.getOptionLength());
        offerToEdit.setSurvey(updateOffer.getSurvey());
        offerToEdit.setHomeWarranty(updateOffer.getHomeWarranty());
        offerToEdit.setAppraisalWaiver(updateOffer.getAppraisalWaiver());
        offerToEdit.setClosingDate(updateOffer.getClosingDate());
        offerToEdit.setClosingCosts(updateOffer.getClosingCosts());
        System.out.println(offerToEdit);
        offersRepository.save(offerToEdit);
    }

    // Offer can be accepted upon, submit of a selection form; post updates the historical data of the selected offer
    @PutMapping("/accepted/{offerId}")
    public void offerAccepted(@PathVariable Long offerId) {
        System.out.println("made it to accepted offer");
        Offer acceptedOffer = offersRepository.findById(offerId).get();
        acceptedOffer.setOfferStatus(OfferStatus.ACCEPTED);
        offersRepository.save(acceptedOffer);
        System.out.printf("The seller has accepted an offer with the id of %d!", acceptedOffer.getId());
    }
  
    @PutMapping("/decline/{offerId}")
    public void offerDeclined(@PathVariable Long offerId) {
        System.out.println("made it to decline offer");
        Offer declinedOffer = offersRepository.findById(offerId).get();
        declinedOffer.setOfferStatus(OfferStatus.DECLINED);
        offersRepository.save(declinedOffer);
        System.out.println(declinedOffer);
    }

    @PutMapping("/countered/{offerId}")
    public void offerCountered(@PathVariable Long offerId, @RequestBody Offer offerUpdate) {
        Offer counteredOffer = offersRepository.findById(offerId).get();
        counteredOffer.setOfferStatus(offerUpdate.getOfferStatus());
        counteredOffer.setCounterId(offerUpdate.getCounterId());
        System.out.println(offerUpdate);
        offersRepository.save(counteredOffer);
    }

}
