package data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingsRepository extends JpaRepository<Listing, Long> {
}
