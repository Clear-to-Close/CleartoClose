package com.codeup.cleartoclose.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ListingsRepository extends JpaRepository<Listing, Long> {
    @Query(value = "SELECT * FROM listings WHERE listings.addresses_id = :address_id", nativeQuery = true)
    Listing findByListingAddress(@Param("address_id") Long address_id);
}
