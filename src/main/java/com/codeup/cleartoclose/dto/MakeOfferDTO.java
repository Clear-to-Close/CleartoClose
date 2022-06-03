package com.codeup.cleartoclose.dto;

import com.codeup.cleartoclose.data.OfferStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MakeOfferDTO {
    private long offerAmount;
    private String loanType;
    private long optionLength;
    private String survey;
    private String homeWarranty;
    private String appraisalWaiver;
    private long closingCosts;
    private String closingDate;
    private String offerorEmail;
    private long listingId;
    private Long counterId;
    private OfferStatus offerStatus;
}
