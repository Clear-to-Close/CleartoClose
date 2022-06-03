package com.codeup.cleartoclose.data;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

@Entity
@Table(name = "listings")
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ElementCollection
    @CollectionTable(name = "listing_icons", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "listing_icons")
    private List<String> image_icons;

    @ElementCollection
    @CollectionTable(name = "house_images", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "house_images")
    private List<String> house_images;

    @ManyToOne
    @JsonIgnoreProperties({"listings", "password", "userAddress", "sellerListings", "sellerId"})
    private User buyer;

    @ManyToOne
    @JsonIgnoreProperties({"listings", "password", "userAddress", "buyerAgentListings"})
    private User buyerAgent;

    @ManyToOne
    @NotNull
    @JsonIgnoreProperties({"listings", "password", "userAddress", "userOffers"})
    private User seller;

    @ManyToOne
    @JsonIgnoreProperties({"listings", "password", "userAddress","sellerAgentListings"})
    private User sellerAgent;


    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private long askingPrice;

    @Column(nullable = false)
    private ListingStatus listingStatus;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties({"listing", "offeror", "seller", "buyer", "buyerAgent", "sellerAgent"})
    @ToString.Exclude
    private Collection<Offer> listingOffers;

    @OneToOne
    @JoinColumn(name = "addresses_id", referencedColumnName = "id")
    @JsonIgnoreProperties("listing")
    @ToString.Exclude
    private Address listingAddress;
}
