package kz.kenzhakhimov.authservice.services;

import kz.kenzhakhimov.authservice.dto.RegisterDTO;
import kz.kenzhakhimov.authservice.dto.RegisterResponse;
import kz.kenzhakhimov.authservice.dto.UserInfoDTO;
import kz.kenzhakhimov.authservice.entitites.User;
import kz.kenzhakhimov.authservice.entitites.UserRole;
import kz.kenzhakhimov.authservice.mapper.UserMapper;
import kz.kenzhakhimov.authservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private QuickAccessCodeService quickAccessCodeService;

    public RegisterResponse register(RegisterDTO registerDTO) {
        // Используем MapStruct для создания User
        User user = userMapper.toEntity(registerDTO);

        // Шифруем пароль отдельно
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        // Генерируем уникальный код доступа
        user.setQuickAccessCode(quickAccessCodeService.generateUniqueCode());

        // Сохраняем пользователя
        User savedUser = userRepository.save(user);

        // Маппим обратно в RegisterResponse
        return userMapper.toRegisterResponse(savedUser);
    }

    /**
     * Быстрый вход по коду доступа
     */
    public UserInfoDTO quickLogin(String quickAccessCode) {
        User user = userRepository.findByQuickAccessCode(quickAccessCode)
                .orElseThrow(() -> new RuntimeException("Неверный код доступа"));
        
        return userMapper.toUserInfoDTO(user);
    }

    /**
     * Создание администратора
     */
    public UserInfoDTO createAdmin(String username, String password, String email, String fullName, String phoneNumber, String position) {
        User admin = new User();
        admin.setUsername(username);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setEmail(email);
        admin.setFullName(fullName);
        admin.setPhoneNumber(phoneNumber);
        admin.setPosition(position);
        admin.setRoles(Set.of(UserRole.ADMIN.getCode()));
        admin.setQuickAccessCode(quickAccessCodeService.generateUniqueCode());
        
        User savedAdmin = userRepository.save(admin);
        return userMapper.toUserInfoDTO(savedAdmin);
    }

    /**
     * Создание сотрудника
     */
    public UserInfoDTO createEmployee(String username, String password, String email, String fullName, String phoneNumber, String position) {
        User employee = new User();
        employee.setUsername(username);
        employee.setPassword(passwordEncoder.encode(password));
        employee.setEmail(email);
        employee.setFullName(fullName);
        employee.setPhoneNumber(phoneNumber);
        employee.setPosition(position);
        employee.setRoles(Set.of(UserRole.EMPLOYEE.getCode()));
        employee.setQuickAccessCode(quickAccessCodeService.generateUniqueCode());
        
        User savedEmployee = userRepository.save(employee);
        return userMapper.toUserInfoDTO(savedEmployee);
    }

    /**
     * Получение всех пользователей
     */
    public List<UserInfoDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserInfoDTO)
                .collect(Collectors.toList());
    }

    /**
     * Получение пользователя по ID
     */
    public UserInfoDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        return userMapper.toUserInfoDTO(user);
    }

    /**
     * Обновление пользователя
     */
    public UserInfoDTO updateUser(Long id, UserInfoDTO userInfoDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        
        user.setFullName(userInfoDTO.getFullName());
        user.setPhoneNumber(userInfoDTO.getPhoneNumber());
        user.setPosition(userInfoDTO.getPosition());
        user.setEmail(userInfoDTO.getEmail());
        
        User savedUser = userRepository.save(user);
        return userMapper.toUserInfoDTO(savedUser);
    }

    /**
     * Удаление пользователя
     */
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        
        // Освобождаем код доступа
        quickAccessCodeService.releaseCode(user.getQuickAccessCode());
        
        userRepository.delete(user);
    }
}
