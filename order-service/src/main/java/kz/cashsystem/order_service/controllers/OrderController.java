package kz.cashsystem.order_service.controllers;

import kz.cashsystem.order_service.entity.Order;
import kz.cashsystem.order_service.records.CafeOrderRequest;
import kz.cashsystem.order_service.services.CafeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {
    private final CafeService cafeService;

    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody CafeOrderRequest request) {
        Order order = cafeService.placeOrder(request);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }
}
