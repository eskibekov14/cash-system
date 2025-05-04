package kz.kenzhakhimov.authservice.services;


import kz.kenzhakhimov.authservice.entitites.User;
import kz.kenzhakhimov.authservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserInfoConfigManager implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;  // Репозиторий для работы с пользователями

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Найдем пользователя по имени
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        // Создадим объект UserDetails на основе данных пользователя
        UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(username);
        builder.password(user.getPassword());
        builder.roles(user.getRoles().toArray(new String[0])); // Здесь предполагается, что у пользователя есть роли

        return builder.build();
    }
}
