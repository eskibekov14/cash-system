package kz.kenzhakhimov.authservice.config;

import kz.kenzhakhimov.authservice.entitites.User;
import kz.kenzhakhimov.authservice.entitites.UserRole;
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
        // Создаем администратора, если его нет
        if (userRepository.findByUsername("admin") == null) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@restaurant.com");
            admin.setFullName("Администратор Системы");
            admin.setPhoneNumber("+7 777 123 45 67");
            admin.setPosition("Главный администратор");
            admin.setRoles(Set.of(UserRole.ADMIN.getCode()));
            admin.setQuickAccessCode("ADMIN1");
            
            userRepository.save(admin);
            System.out.println("Admin user created: admin (Quick Access Code: ADMIN1)");
        }

        // Создаем сотрудника, если его нет
        if (userRepository.findByUsername("employee") == null) {
            User employee = new User();
            employee.setUsername("employee");
            employee.setPassword(passwordEncoder.encode("emp123"));
            employee.setEmail("employee@restaurant.com");
            employee.setFullName("Иванов Иван Иванович");
            employee.setPhoneNumber("+7 777 987 65 43");
            employee.setPosition("Официант");
            employee.setRoles(Set.of(UserRole.EMPLOYEE.getCode()));
            employee.setQuickAccessCode("EMP001");
            
            userRepository.save(employee);
            System.out.println("Employee user created: employee (Quick Access Code: EMP001)");
        }

        // Создаем тестового пользователя, если его нет
        if (userRepository.findByUsername("testuser") == null) {
            User testUser = new User();
            testUser.setUsername("testuser");
            testUser.setPassword(passwordEncoder.encode("testpass123"));
            testUser.setEmail("test@example.com");
            testUser.setFullName("Тестовый Пользователь");
            testUser.setPhoneNumber("+7 777 111 22 33");
            testUser.setPosition("Тестер");
            testUser.setRoles(Set.of(UserRole.EMPLOYEE.getCode()));
            testUser.setQuickAccessCode("TEST1");
            
            userRepository.save(testUser);
            System.out.println("Test user created: testuser (Quick Access Code: TEST1)");
        }
    }
}
