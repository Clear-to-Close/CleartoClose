package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.*;
import com.codeup.cleartoclose.dto.AcceptOfferDTO;
import com.codeup.cleartoclose.dto.ListingDTO;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
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

    // Searching by zipCode returns a list of addresses that can be used to pin on a map
    // selection of one of these addresses in listing then appends the address and zip to the URL and GETS the listing using getListingByAddress
    //***Note*** printing the list of addresses in this function returns StackTrace
    @GetMapping("searchByZipCode")
    public List<Listing> getAllListingsByZipCode(@RequestParam String zipCode) {
        List<Address> allAddressesByZip = addressRepository.findAddressesByZipCode(zipCode);

        List<Listing> listings = new ArrayList<>();
        for (Address address : allAddressesByZip) {
            listings.add(address.getListing());
        }

        return listings;
    }


    @PostMapping
    public void createListing(@RequestBody ListingDTO dto, @RequestParam String sellerEmail, @RequestParam String sellerAgentEmail,
                              @RequestParam(required = false) String buyersEmail, @RequestParam(required = false) String buyersAgentEmail) {

        Listing newListing = new Listing();

        newListing.setSeller(usersRepository.getById(dto.getSellerId()));
        newListing.setSellerAgent(usersRepository.getById(dto.getSellerAgentId()));
        newListing.setBuyer(usersRepository.getById(dto.getBuyerId()));
        newListing.setBuyerAgent(usersRepository.getById(dto.getBuyerAgentId()));

        newListing.setDescription(dto.getDescription());
        newListing.setAskingPrice(dto.getAskingPrice());
        newListing.setListingStatus(dto.getListingStatus());

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
        listingToUpdate.setListingStatus(offer.getStatus());
        listingRepository.save(listingToUpdate);
    }
}
