package kz.kenzhakhimov.authservice.services;

import kz.kenzhakhimov.authservice.dto.RegisterDTO;
import kz.kenzhakhimov.authservice.dto.RegisterResponse;
import kz.kenzhakhimov.authservice.entitites.User;
import kz.kenzhakhimov.authservice.mapper.UserMapper;
import kz.kenzhakhimov.authservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    public RegisterResponse register(RegisterDTO registerDTO) {
        // Используем MapStruct для создания User
        User user = userMapper.toEntity(registerDTO);

        // Шифруем пароль отдельно
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        // Сохраняем пользователя
        User savedUser = userRepository.save(user);

        // Маппим обратно в RegisterResponse
        return userMapper.toRegisterResponse(savedUser);
    }
}
