package kz.kenzhakhimov.authservice.controllers;

import jakarta.validation.Valid;
import kz.kenzhakhimov.authservice.dto.LoginDTO;
import kz.kenzhakhimov.authservice.dto.LoginResponse;
import kz.kenzhakhimov.authservice.dto.RegisterDTO;
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
    @GetMapping("/validate-token")
    public ResponseEntity<Void> validateToken(@RequestHeader("Authorization") String token) {
        return tokenValidationService.validate(token);
    }
}
