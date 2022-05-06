package data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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
    private User buyerId;

    @ManyToOne
    @NotNull
    @JsonIgnoreProperties({"listings", "password"})
    private User buyerAgentId;

    @ManyToOne
    @NotNull
    @JsonIgnoreProperties({"listings", "password"})
    private User sellerId;

    @ManyToOne
    @JsonIgnoreProperties({"listings", "password"})
    private User sellerAgentId;

    @OneToMany
    @JsonIgnoreProperties({"offers"})
    private List<Offer> offerId;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private long askingPrice;

    @Column(nullable = false)
    private String active;
}
