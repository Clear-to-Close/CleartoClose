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

    @Column(nullable = true)
    private String preApproved;

    @OneToMany(mappedBy = "buyer", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("buyer")
    @Transient
    private Collection<Listing> buyerListings;

    @OneToMany(mappedBy = "seller", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("seller")
    @Transient
    private Collection<Listing> sellerListings;

    @OneToMany(mappedBy = "buyerAgent", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("buyerAgent")
    @Transient
    private Collection<Listing> buyerAgentListings;

    @OneToMany(mappedBy = "sellerAgent", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("sellerAgent")
    @Transient
    private Collection<Listing> sellerAgentListings;

    @OneToMany(mappedBy = "offeror", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("offeror")
    @Transient
    private Collection<Offer> userOffers;

    @OneToOne
    @JoinColumn(name = "addresses_id", referencedColumnName = "id")
    @JsonIgnoreProperties("user")
    private Address userAddress;

    @OneToMany(mappedBy = "realtor", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("realtor")
    @Transient
    private Collection<AgentInfo> realtorInfo;
}
