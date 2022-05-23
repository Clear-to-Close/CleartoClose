package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.*;
import com.codeup.cleartoclose.dto.AcceptOfferDTO;
import com.codeup.cleartoclose.dto.ListingDTO;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("searchByAddress")
    public Listing getListingByAddress(@RequestParam String address, @RequestParam String city, @RequestParam String state,
                                       @RequestParam String zip) {

        return listingRepository.findByListingAddress(addressRepository.findByAddressAndCityAndStateAndZipCode(address, city, state, zip));
    }

    // Searching by zipCode returns a list of addresses that can be used to pin on a map
    // selection of one of these addresses in listing then appends the address and zip to the URL and GETS the listing using getListingByAddress
    //***Note*** printing the list of addresses in this function returns StackTrace
    @GetMapping("search")
    public Collection<Listing> getListingByMultiple(@RequestParam(required = false) String city, @RequestParam(required = false) String state,
                                                    @RequestParam(required = false) String zip) {
        return listingRepository.findByMultiple(Optional.ofNullable(city), Optional.ofNullable(state), Optional.ofNullable(zip));
    }


    @PostMapping
    public void createListing(@RequestBody ListingDTO createDTO) {

        Listing newListing = new Listing();

        newListing.setSeller(usersRepository.findByEmail(createDTO.getSellerEmail()));
        newListing.setSellerAgent(usersRepository.findByEmail(createDTO.getSellerAgentEmail()));
        newListing.setBuyer(usersRepository.findByEmail(createDTO.getBuyerEmail()));
        newListing.setBuyerAgent(usersRepository.findByEmail(createDTO.getBuyerAgentEmail()));

        newListing.setDescription(createDTO.getDescription());
        newListing.setAskingPrice(createDTO.getAskingPrice());
        newListing.setListingStatus(ListingStatus.ACTIVE);

        Address newAddress = new Address();
        newAddress.setAddress(createDTO.getAddress());
        newAddress.setCity(createDTO.getCity());
        newAddress.setState(createDTO.getState());
        newAddress.setApartmentNumber(createDTO.getApartmentNumber());
        newAddress.setZipCode(createDTO.getZipCode());

        addressRepository.save(newAddress);

        newListing.setListingAddress(addressRepository.findByAddressAndZipCode(createDTO.getAddress(), createDTO.getZipCode()));

        listingRepository.save(newListing);
    }

    @PutMapping("{listingId}")
    public void editListing(@RequestBody ListingDTO editDTO, @PathVariable long listingId){
        Listing listingToEdit = listingRepository.getById(listingId);

        listingToEdit.setSeller(usersRepository.findByEmail(editDTO.getSellerEmail()));
        listingToEdit.setSellerAgent(usersRepository.findByEmail(editDTO.getSellerEmail()));
        listingToEdit.setBuyer(usersRepository.findByEmail(editDTO.getBuyerEmail()));
        listingToEdit.setBuyerAgent(usersRepository.findByEmail(editDTO.getBuyerAgentEmail()));

        listingToEdit.setDescription(editDTO.getDescription());
        listingToEdit.setAskingPrice(editDTO.getAskingPrice());
        listingToEdit.setListingStatus(editDTO.getListingStatus());

        Address addressToEdit = addressRepository.getById(listingToEdit.getListingAddress().getId());

        addressToEdit.setAddress(editDTO.getAddress());

        addressToEdit.setCity(editDTO.getCity());
        addressToEdit.setState(editDTO.getState());
        addressToEdit.setApartmentNumber(editDTO.getApartmentNumber());
        addressToEdit.setZipCode(editDTO.getZipCode());

        listingRepository.save(listingToEdit);
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
