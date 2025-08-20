package kz.kenzhakhimov.authservice.config;

import kz.kenzhakhimov.authservice.entitites.User;
import kz.kenzhakhimov.authservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Создаем тестового пользователя, если его нет
        if (userRepository.findByUsername("testuser") == null) {
            User testUser = new User();
            testUser.setUsername("testuser");
            testUser.setPassword(passwordEncoder.encode("testpass123"));
            testUser.setEmail("test@example.com");
            testUser.setRoles(Set.of("USER"));
            
            userRepository.save(testUser);
            System.out.println("Test user created: testuser");
        }
    }
}
