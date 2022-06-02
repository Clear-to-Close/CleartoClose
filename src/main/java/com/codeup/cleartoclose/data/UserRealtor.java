package com.codeup.cleartoclose.data;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

@Entity
@Table(name = "users_realtor")
public class UserRealtor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_one_id", referencedColumnName = "id")
    User userOne;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_two_id", referencedColumnName = "id")
    User UserTwo;
}
