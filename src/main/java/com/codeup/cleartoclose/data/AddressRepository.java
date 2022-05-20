package com.codeup.cleartoclose.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findByAddressAndZipCode(String address, String zipCode);

    List<Address> findAddressesByZipCode(String zipCode);

    Address findByAddress(Address address);
}
