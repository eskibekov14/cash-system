// CashRegisterController.java
package kz.cashsystem.order_service.controllers;

import kz.cashsystem.order_service.dtos.SaleRequest;
import kz.cashsystem.order_service.dtos.SaleResponse;
import kz.cashsystem.order_service.dtos.ShiftResponse;
import kz.cashsystem.order_service.services.CashRegisterService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/cash")
public class CashRegisterController {
    private final CashRegisterService service;

    public CashRegisterController(CashRegisterService service) {
        this.service = service;
    }

    @PostMapping("/open-shift")
    public Mono<ShiftResponse> openShift() {
        return service.openShift();
    }

    @PostMapping("/sale")
    public Mono<SaleResponse> sale(@RequestBody SaleRequest request) {
        return service.registerSale(request);
    }

    @PostMapping("/close-shift")
    public Mono<Void> closeShift() {
        return service.closeShift();
    }
}