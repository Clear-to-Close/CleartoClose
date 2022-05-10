package com.codeup.cleartoclose.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ListingDTO {
    private String description;

    private long askingPrice;

    private String status;

    private String address;

    private String apartmentNumber;

    private String city;

    private String state;

    private String zipCode;
}
