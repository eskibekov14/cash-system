package kz.kenzhakhimov.authservice.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TokenValidationService {
    private final JWTUtil jwtUtil;

    public TokenValidationService(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public ResponseEntity<Void> validate(String token) {
        try {
            if (token != null && token.startsWith("Bearer ")) {
                String jwtToken = token.substring(7);
                if (jwtUtil.validateToken(jwtToken)) {
                    return ResponseEntity.ok().build();
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
