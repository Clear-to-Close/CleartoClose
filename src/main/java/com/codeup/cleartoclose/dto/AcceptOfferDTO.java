package com.codeup.cleartoclose.dto;

import com.codeup.cleartoclose.data.ListingStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AcceptOfferDTO {
    private ListingStatus status;
    private long buyerID;
}
