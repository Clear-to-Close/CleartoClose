package com.codeup.cleartoclose.data;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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

}
