package com.codeup.cleartoclose.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface ListingsRepository extends JpaRepository<Listing, Long> {
    Listing findByListingAddress(Address address);

//    Optional<Listing> findListingsByZipCode(Address zipCode);
}
