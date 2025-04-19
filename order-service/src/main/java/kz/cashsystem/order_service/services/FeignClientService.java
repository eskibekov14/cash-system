package kz.cashsystem.order_service.services;

import kz.cashsystem.order_service.dtos.ModifierDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Component
@FeignClient(name="order-service", url = "http://localhost:8080/api")
public interface FeignClientService {
    @GetMapping("/modifier")
    List<ModifierDTO> getAllModifiers();
}
