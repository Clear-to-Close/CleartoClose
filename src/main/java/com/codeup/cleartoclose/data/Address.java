package com.codeup.cleartoclose.data;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@JsonFilter("addressFilter")
@Entity
@ToString
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    @NotNull
    private String address;

    @Column
    private String apartmentNumber;

    @Column
    @NotNull
    private String city;

    @Column
    @NotNull
    private String state;

    @Column
    @NotNull
    private String zipCode;

    @OneToOne(mappedBy = "listingAddress")
    @JsonIgnoreProperties({"listingAddress", "sellerAgent"})
    private Listing listing;

    @OneToOne(mappedBy = "userAddress")
    @JsonIgnoreProperties({"userAddress", "listingAddress"})
    private User user;
}
