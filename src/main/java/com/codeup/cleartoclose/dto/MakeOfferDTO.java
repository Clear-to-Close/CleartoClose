package com.codeup.cleartoclose.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String closingDate;
    private Long offerorId;
    private Long listingId;
}
