package com.codeup.cleartoclose.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.Optional;


public interface ListingsRepository extends JpaRepository<Listing, Long> {
    Listing findByListingAddress(Address address);

    @Query(value = "SELECT * FROM listings l JOIN addresses a on l.addresses_id = a.id WHERE a.city like :city OR a.state = :state OR a.zip_code = " +
            ":zip",
            nativeQuery = true)
    Collection<Listing> findByMultiple(@Param("city") Optional<String> city, @Param("state") Optional<String> state,
                                       @Param("zip") Optional<String> zip);
}
