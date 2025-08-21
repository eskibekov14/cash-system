package kz.kenzhakhimov.authservice.repositories;

import kz.kenzhakhimov.authservice.entitites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    
    Optional<User> findByQuickAccessCode(String quickAccessCode);
}
