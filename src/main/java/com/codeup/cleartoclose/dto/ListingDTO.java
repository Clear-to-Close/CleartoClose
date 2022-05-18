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

    private long sellerId;

    private long sellerAgentId;

    private long buyerId;

    private long buyerAgentId;

    private String description;

    private long askingPrice;

    private ListingStatus listingStatus;

    private String address;

    private String apartmentNumber;

    private String city;

    private String state;

    private String zipCode;
}
