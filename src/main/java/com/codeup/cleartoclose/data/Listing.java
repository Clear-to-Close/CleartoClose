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
@Entity
@ToString
@Table(name = "listings")
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ElementCollection
    @CollectionTable(name = "listing_icons", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "image_list")
    private List<String> image_list;

    @ManyToOne
    @JsonIgnoreProperties({"listings", "password", "userAddress"})
    private User buyer;

    @ManyToOne
    @JsonIgnoreProperties({"listings", "password", "userAddress"})
    private User buyerAgent;

    @ManyToOne
    @NotNull
    @JsonIgnoreProperties({"listings", "password", "userAddress"})
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
    private Collection<Offer> listingOffers;

    @OneToOne
    @JoinColumn(name = "addresses_id", referencedColumnName = "id")
    @JsonIgnoreProperties("listing")
    private Address listingAddress;

}
