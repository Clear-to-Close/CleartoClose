package com.codeup.cleartoclose.data;

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
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JsonIgnoreProperties({"listings", "password"})
    private User buyer;

    @ManyToOne
    @NotNull
    @JsonIgnoreProperties({"listings", "password"})
    private User buyerAgent;

    @ManyToOne
    @NotNull
    @JsonIgnoreProperties({"listings", "password"})
    private User seller;

    @ManyToOne
    @JsonIgnoreProperties({"listings", "password"})
    private User sellerAgent;


    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private long askingPrice;

    @Column(nullable = false)
    private String active;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("listing")
    @Transient
    private Collection<Offer> listingOffers;

    @OneToOne
    @JoinColumn(name = "addresses_id", referencedColumnName = "id")
    private Address listingAddress;
}
