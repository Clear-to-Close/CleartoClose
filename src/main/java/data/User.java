package data;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;


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
}
