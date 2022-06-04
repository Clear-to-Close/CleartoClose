package com.codeup.cleartoclose.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

@Entity
@Table(name = "offers")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Foreign key pointing to User id
    @ManyToOne
    @JsonIgnoreProperties({"userAddress"})
    private User offeror;

    @ManyToOne
    @ToString.Exclude
    private Listing listing;

    @Column(nullable = false)
    private long offerAmount;

    @Column(nullable = false)
    private String homeWarranty;

    @Column(nullable = false)
    private long closingCosts;

    @Column(nullable = false)
    private long optionLength;

    @Column(nullable = false)
    private String appraisalWaiver;

    @Column(nullable = false)
    private String survey;

    // An associative table that lists different loan types may be desired here; would allow for a drop-down selection as well
    @Column(nullable = false)
    private String loanType;

    @Column(nullable = false)
    private String closingDate;

    @Column
    private Date acceptanceDate;

    @Column(nullable = false)
    private OfferStatus offerStatus;

    @Column
    private Long counterId;

}
