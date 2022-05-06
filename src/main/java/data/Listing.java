package data;

import lombok.*;

import javax.persistence.*;

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

    private long buyerId;

    private long buyerAgentId;

    private long sellerId;

    private long sellerAgentId;

    private long offerId;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private long askingPrice;

    @Column(nullable = false)
    private String active;
}
