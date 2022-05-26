package com.codeup.cleartoclose.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Collection;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Email
    @NotEmpty
    private String email;

    @Column(nullable = false)
    private String username;

    @ToString.Exclude
    private String password;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(name = "preApproval_filename")
    @ToString.Exclude
    private String preApprovalileName;

    @OneToMany(mappedBy = "buyer", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties({"buyer", "buyerAgent"})
    @Transient
    @ToString.Exclude
    private Collection<Listing> buyerListings;

    @OneToMany(mappedBy = "seller", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties({"seller", "sellerAgent", "listingOffers", "listingAddress"})
    @ToString.Exclude
    private Collection<Listing> sellerListings;

    @OneToMany(mappedBy = "buyerAgent", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties({"buyerAgent", "listingAddress"})
    @ToString.Exclude
    private Collection<Listing> buyerAgentListings;

    @OneToMany(mappedBy = "sellerAgent", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties({"seller", "sellerAgent", "listingAddress", "offeror"})
    @ToString.Exclude
    private Collection<Listing> sellerAgentListings;

    @OneToMany(mappedBy = "offeror", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties({"offeror", "listing"})
    @ToString.Exclude
    private Collection<Offer> userOffers;

    @OneToOne
    @JoinColumn(name = "addresses_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"user"})
    @ToString.Exclude
    private Address userAddress;

    @OneToMany(mappedBy = "realtor", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("realtor")
    @ToString.Exclude
    private Collection<AgentInfo> realtorInfo;

}
