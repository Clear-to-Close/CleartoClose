package com.codeup.cleartoclose.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ListingsRepository extends JpaRepository<Listing, Long> {

    Listing findByListingAddress(Address address);
}
