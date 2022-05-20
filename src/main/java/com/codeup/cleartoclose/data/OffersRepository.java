package com.codeup.cleartoclose.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;

public interface OffersRepository extends JpaRepository<Offer, Long> {
    Collection<Offer> findByListing(Optional<Listing> listing);
    Collection<Offer> findByOfferor(Optional<User> byId);


}
