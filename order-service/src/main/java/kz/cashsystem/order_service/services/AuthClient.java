package kz.cashsystem.order_service.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "auth-service", url = "http://localhost:8082/api/auth")
public interface AuthClient {
    @GetMapping("/validate-token")
    ResponseEntity<Void> validateToken(@RequestHeader("Authorization") String token);
}
