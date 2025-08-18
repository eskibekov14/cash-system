package kz.cashsystem.order_service.services;

import kz.cashsystem.order_service.records.PriceCalculationRequest;
import kz.cashsystem.order_service.records.PriceCalculationResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Component
@FeignClient(name = "menu-service", url = "${menu.service.base-url}")
public interface MenuServiceClient {
    @PostMapping("/prices/calculate")
    PriceCalculationResponse calculatePrice(@RequestBody PriceCalculationRequest request);
}
