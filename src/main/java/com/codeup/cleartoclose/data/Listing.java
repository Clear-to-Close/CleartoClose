package com.codeup.cleartoclose.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

@Entity
@Table(name = "listings")
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JsonIgnoreProperties({"listings", "password", "userAddress"})
    private User buyer;

    @ManyToOne
    @JsonIgnoreProperties({"listings", "password", "userAddress"})
    private User buyerAgent;

    @ManyToOne
    @NotNull
    @JsonIgnoreProperties({"listings", "password", "userAddress", "sellerAgentListings"})
    private User seller;

    @ManyToOne
    @JsonIgnoreProperties({"listings", "password", "userAddress"})
    private User sellerAgent;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private long askingPrice;

    @Column(nullable = false)
    private ListingStatus listingStatus;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("listing")
    @ToString.Exclude
    private Collection<Offer> listingOffers;

    @OneToOne
    @JoinColumn(name = "addresses_id", referencedColumnName = "id")
    @JsonIgnoreProperties("listing")
    @ToString.Exclude
    private Address listingAddress;
}
