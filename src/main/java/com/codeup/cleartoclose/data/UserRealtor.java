package com.codeup.cleartoclose.data;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
//same thing
@Entity
@Table(name = "users_realtor")
public class UserRealtor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user", referencedColumnName = "id")
    User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "realtor", referencedColumnName = "id")
    User realtor;
}
