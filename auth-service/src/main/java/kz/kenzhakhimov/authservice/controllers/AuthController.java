package kz.kenzhakhimov.authservice.controllers;

import jakarta.validation.Valid;
import kz.kenzhakhimov.authservice.dto.LoginDTO;
import kz.kenzhakhimov.authservice.dto.LoginResponse;
import kz.kenzhakhimov.authservice.dto.QuickLoginDTO;
import kz.kenzhakhimov.authservice.dto.RegisterDTO;
import kz.kenzhakhimov.authservice.dto.UserInfoDTO;
import kz.kenzhakhimov.authservice.services.AuthService;
import kz.kenzhakhimov.authservice.services.JWTUtil;
import kz.kenzhakhimov.authservice.services.TokenValidationService;
import kz.kenzhakhimov.authservice.services.UserInfoConfigManager;
import kz.kenzhakhimov.authservice.utils.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final JWTUtil jwtUtil;

    private final AuthenticationManager authenticationManager;

    private final UserInfoConfigManager userInfoConfigManager;

    private final TokenValidationService tokenValidationService;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@Valid @RequestBody RegisterDTO registerDTO) {
        return ResponseHandler.generateResponse(
                "User registered successfully",
                HttpStatus.OK,
                authService.register(registerDTO)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginDTO loginDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getUsername(),
                            loginDTO.getPassword()
                    )
            );

            UserDetails userDetails = userInfoConfigManager.loadUserByUsername(loginDTO.getUsername());
            String jwt = jwtUtil.generateToken(userDetails.getUsername());

            LoginResponse loginResponse = LoginResponse.builder()
                    .accessToken(jwt)
                    .build();

            return ResponseHandler.generateResponse(
                    "User logged in successfully",
                    HttpStatus.OK,
                    loginResponse
            );
        } catch (Exception e) {
            return new ResponseEntity<>("Incorrect username or password", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/quick-login")
    public ResponseEntity<Object> quickLogin(@Valid @RequestBody QuickLoginDTO quickLoginDTO) {
        try {
            UserInfoDTO userInfo = authService.quickLogin(quickLoginDTO.getQuickAccessCode());
            
            // Генерируем JWT токен для быстрого входа
            String jwt = jwtUtil.generateToken(userInfo.getUsername());
            
            LoginResponse loginResponse = LoginResponse.builder()
                    .accessToken(jwt)
                    .build();
            
            return ResponseHandler.generateResponse(
                    "Quick login successful",
                    HttpStatus.OK,
                    loginResponse
            );
        } catch (Exception e) {
            return new ResponseEntity<>("Неверный код доступа", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create-admin")
    public ResponseEntity<Object> createAdmin(@RequestBody UserInfoDTO userInfoDTO) {
        try {
            UserInfoDTO admin = authService.createAdmin(
                    userInfoDTO.getUsername(),
                    "admin123", // Временный пароль
                    userInfoDTO.getEmail(),
                    userInfoDTO.getFullName(),
                    userInfoDTO.getPhoneNumber(),
                    userInfoDTO.getPosition()
            );
            
            return ResponseHandler.generateResponse(
                    "Admin created successfully",
                    HttpStatus.CREATED,
                    admin
            );
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create-employee")
    public ResponseEntity<Object> createEmployee(@RequestBody UserInfoDTO userInfoDTO) {
        try {
            UserInfoDTO employee = authService.createEmployee(
                    userInfoDTO.getUsername(),
                    "emp123", // Временный пароль
                    userInfoDTO.getEmail(),
                    userInfoDTO.getFullName(),
                    userInfoDTO.getPhoneNumber(),
                    userInfoDTO.getPosition()
            );
            
            return ResponseHandler.generateResponse(
                    "Employee created successfully",
                    HttpStatus.CREATED,
                    employee
            );
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<Object> getAllUsers() {
        try {
            return ResponseHandler.generateResponse(
                    "Users retrieved successfully",
                    HttpStatus.OK,
                    authService.getAllUsers()
            );
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Long id) {
        try {
            return ResponseHandler.generateResponse(
                    "User retrieved successfully",
                    HttpStatus.OK,
                    authService.getUserById(id)
            );
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable Long id, @RequestBody UserInfoDTO userInfoDTO) {
        try {
            return ResponseHandler.generateResponse(
                    "User updated successfully",
                    HttpStatus.OK,
                    authService.updateUser(id, userInfoDTO)
            );
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
        try {
            authService.deleteUser(id);
            return ResponseHandler.generateResponse(
                    "User deleted successfully",
                    HttpStatus.OK,
                    null
            );
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/validate-token")
    public ResponseEntity<Void> validateToken(@RequestHeader("Authorization") String token) {
        return tokenValidationService.validate(token);
    }
}
