package com.codeup.cleartoclose.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findByAddressAndZipCode(String address, String zipcode);

    @Query("from Address a where a.address like %:term%")
    List<Address> searchByTitleLike(@Param("term") String term);
}
