package kz.cashsystem.menu_service.controllers;

import kz.cashsystem.menu_service.records.PriceCalculationRequest;
import kz.cashsystem.menu_service.records.PriceCalculationResponse;
import kz.cashsystem.menu_service.service.PriceCalculationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/prices")
@RequiredArgsConstructor
public class PriceController {
    private final PriceCalculationService priceCalculationService;

    @PostMapping("/calculate")
    public PriceCalculationResponse calculate(@RequestBody PriceCalculationRequest request) {
        return priceCalculationService.calculatePrice(
                request.menuItemId(),
                request.modifiersId()
        );
    }
}
