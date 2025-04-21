package kz.cashsystem.order_service.services;

import kz.cashsystem.order_service.dtos.ModifierDTO;
import kz.cashsystem.order_service.records.PriceCalculationRequest;
import kz.cashsystem.order_service.records.PriceCalculationResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Component
@FeignClient(name="order-service", url = "http://localhost:8080/api")
public interface MenuServiceClient {
    @PostMapping("/prices/calculate")
    PriceCalculationResponse calculatePrice(@RequestBody PriceCalculationRequest request);
}
