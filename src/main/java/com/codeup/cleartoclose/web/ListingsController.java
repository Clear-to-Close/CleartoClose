package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.*;
import com.codeup.cleartoclose.dto.AcceptOfferDTO;
import com.codeup.cleartoclose.dto.ListingDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/listings", headers = "Accept=application/json")
public class ListingsController {

    private final ListingsRepository listingRepository;
    private final UsersRepository usersRepository;
    private final AddressRepository addressRepository;

    public ListingsController(ListingsRepository listingRepository, UsersRepository usersRepository, AddressRepository addressRepository) {
        this.listingRepository = listingRepository;
        this.usersRepository = usersRepository;
        this.addressRepository = addressRepository;
    }

    // This would be more for user profile purposes; US22/F2? or US21/F3
    @GetMapping
    public List<Listing> getAllListings() {
        return listingRepository.findAll();
    }

    // Will return a single listing with all information; US19/F2 As an auth user, I can see all listing information
    @GetMapping("{listingId}")
    public Optional<Listing> getListingById(@PathVariable Long listingId) {
        return listingRepository.findById(listingId);
    }

    @GetMapping("searchByAddressAndZipCode")
    public Listing getListingByAddress(@RequestParam String address, @RequestParam String zipCode) {
        System.out.println(address);
        System.out.println(zipCode);
        Address foundAddress = addressRepository.findByAddressAndZipCode(address, zipCode);
        return listingRepository.findByListingAddress(foundAddress);
    }

    @GetMapping("searchByZipCode")
    public List<Listing> getListingsByZipCode(@RequestParam String zipCode) {
        List<Address> allAddressesByZipCode = addressRepository.findAddressesByZipCode(zipCode);
        System.out.println(allAddressesByZipCode);
//        System.out.println(listingRepository.findListingsByZipCode(allAddressesByZipCode));

//        return listingRepository.findListingsByZipCode(allAddressesByZipCode);
        return null;
    }


    @PostMapping
    public void createListing(@RequestBody ListingDTO dto, @RequestParam String sellerEmail, @RequestParam String sellerAgentEmail,
                              @RequestParam(required = false) String buyersEmail, @RequestParam(required = false) String buyersAgentEmail) {

        Listing newListing = new Listing();

        newListing.setSeller(usersRepository.findByEmail(sellerEmail));
        newListing.setSellerAgent(usersRepository.findByEmail(sellerAgentEmail));
        newListing.setBuyer(usersRepository.findByEmail(buyersEmail));
        newListing.setBuyerAgent(usersRepository.findByEmail(buyersAgentEmail));

        newListing.setDescription(dto.getDescription());
        newListing.setAskingPrice(dto.getAskingPrice());
        newListing.setStatus(ListingStatus.ACTIVE);

        Address newAddress = new Address();
        newAddress.setAddress(dto.getAddress());
        newAddress.setCity(dto.getCity());
        newAddress.setState(dto.getState());
        newAddress.setApartmentNumber(dto.getApartmentNumber());
        newAddress.setZipCode(dto.getZipCode());

        addressRepository.save(newAddress);

        newListing.setListingAddress(addressRepository.findByAddressAndZipCode(dto.getAddress(), dto.getZipCode()));

        listingRepository.save(newListing);
    }

    // TODO: to accept an offer a method has to be written here changing the active status from "yes" to "no"
    @PutMapping("/acceptOffer/{listingId}")
    public void acceptOffer(@PathVariable Long listingId, @RequestBody AcceptOfferDTO offer) {
        Listing listingToUpdate = listingRepository.getById(listingId);
        listingToUpdate.setBuyer(usersRepository.getById(offer.getBuyerID()));
//        listingToUpdate.setBuyerAgent(updatedListing.getBuyerAgent());
        listingToUpdate.setStatus(offer.getStatus());
        listingRepository.save(listingToUpdate);
    }
}
