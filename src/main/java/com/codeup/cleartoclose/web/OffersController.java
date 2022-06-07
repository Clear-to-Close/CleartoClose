package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.*;
import com.codeup.cleartoclose.dto.MakeOfferDTO;
import com.codeup.cleartoclose.services.MailService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
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
    private final MailService mailService;


    public OffersController(OffersRepository offersRepository, ListingsRepository listingsRepository, UsersRepository usersRepository, MailService mailService) {
        this.offersRepository = offersRepository;
        this.listingsRepository = listingsRepository;
        this.usersRepository = usersRepository;
        this.mailService = mailService;
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

    public void submitNewOffer(@RequestBody MakeOfferDTO newOfferDTO, OAuth2Authentication authUser) {
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


        String subject = "New Offer";
        System.out.println(subject);
        String body = "A new offer has been placed. Log in to see the offer. http://localhost:8080/login";
        mailService.prepareAndSend(currentListing.getSeller(), subject, body);
        mailService.prepareAndSend(currentListing.getSeller().getRealtor().iterator().next(), subject, body);
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

        String subject = "Offer Accepted";
        String offerorBody = "Your Offer has been accepted. Log in to view. http://localhost:8080/login";
        String realtorBody = "An offer has been accepted";

        mailService.prepareAndSend(acceptedOffer.getOfferor(), subject, offerorBody);
        mailService.prepareAndSend(acceptedOffer.getOfferor().getRealtor().iterator().next(), subject, realtorBody);
        offersRepository.save(acceptedOffer);
        System.out.printf("The seller has accepted an offer with the id of %d!", acceptedOffer.getId());
    }
  
    @PutMapping("/decline/{offerId}")
    public void offerDeclined(@PathVariable Long offerId) {

        Offer acceptedOffer = offersRepository.findById(offerId).get();
        acceptedOffer.setOfferStatus(OfferStatus.DECLINED);

        String subject = "Offer Declined";
        String offerorBody = "Your Offer has been declined. Log in to view. http://localhost:8080/login";
        String realtorBody = "An offer has been declined";

        mailService.prepareAndSend(acceptedOffer.getOfferor(), subject, offerorBody);
        mailService.prepareAndSend(acceptedOffer.getOfferor().getRealtor().iterator().next(), subject, realtorBody);

        offersRepository.save(acceptedOffer);

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
        System.out.println(counteredOffer);

        String listingAddress = counteredOffer.getListing().getListingAddress().getAddress();

        String subject = "Offer Countered";

        String offerorBody =
                String.format("Your offer has been countered for %s. Log in to view the updates to the offer. http://localhost:8080/login",
                        listingAddress).toString();

        String realtorBody = String.format("An offer has been countered for %s. Log in to view the updates to the offer. " +
                        "http://localhost:8080/login",
                listingAddress).toString();

        mailService.prepareAndSend(counteredOffer.getOfferor(), subject, offerorBody);
        mailService.prepareAndSend(counteredOffer.getOfferor().getRealtor().iterator().next(), subject, realtorBody);

        System.out.println(offerUpdate);
        offersRepository.save(counteredOffer);
    }

}
