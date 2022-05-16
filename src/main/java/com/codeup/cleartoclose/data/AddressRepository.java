package com.codeup.cleartoclose.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findByAddressAndZipCode(String address, String zipCode);
}
