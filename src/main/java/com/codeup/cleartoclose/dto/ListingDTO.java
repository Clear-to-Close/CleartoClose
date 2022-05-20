package com.codeup.cleartoclose.dto;

import com.codeup.cleartoclose.data.ListingStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ListingDTO {

    private String sellerEmail;

    private String sellerAgentEmail;

    private String buyerEmail;

    private String buyerAgentEmail;

    private String description;

    private long askingPrice;

    private ListingStatus listingStatus;

    private String address;

    private String apartmentNumber;

    private String city;

    private String state;

    private String zipCode;
}
