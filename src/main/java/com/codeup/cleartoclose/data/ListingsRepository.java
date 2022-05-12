package com.codeup.cleartoclose.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingsRepository extends JpaRepository<Listing, Long> {
    Listing findByListingAddress(Address address);
}
