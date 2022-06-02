package com.codeup.cleartoclose.dto;

import com.codeup.cleartoclose.data.User;
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
    private String username;
    private String password;
    private String phoneNumber;
    private User.Role role;
    private String address;
    private String apartmentNumber;
    private String city;
    private String state;
    private String zipCode;
}
