package com.codeup.cleartoclose.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingsRepository extends JpaRepository<Listing, Long> {
<<<<<<< HEAD
    Listing findByAddressListing(Long listingAddress);
=======
    Listing findByListingAddress(Address address);
>>>>>>> backend
}
