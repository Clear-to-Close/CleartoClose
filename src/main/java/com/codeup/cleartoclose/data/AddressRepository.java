package com.codeup.cleartoclose.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findByAddressAndCityAndStateAndZipCode(String address, String city, String state, String zipCode);

    Address findByAddressAndZipCode(String address, String zipCode);
}
