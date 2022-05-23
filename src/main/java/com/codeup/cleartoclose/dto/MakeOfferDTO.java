package com.codeup.cleartoclose.dto;

import com.codeup.cleartoclose.data.Listing;
import com.codeup.cleartoclose.data.ListingStatus;
import com.codeup.cleartoclose.data.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MakeOfferDTO {
    private Long offerAmount;
    private String loanType;
    private Long optionLength;
    private String survey;
    private String homeWarranty;
    private String appraisalWaiver;
    private Long closingCosts;
    private Long offerorId;
    private Long listingId;
}
