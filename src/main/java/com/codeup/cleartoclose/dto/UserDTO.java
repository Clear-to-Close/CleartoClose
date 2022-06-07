package com.codeup.cleartoclose.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class UserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String apartmentNumber;
    private String city;
    private String state;
    private String zipCode;
    private String realtorFirstName;
    private String realtorLastName;
    private String realtorEmail;
}
