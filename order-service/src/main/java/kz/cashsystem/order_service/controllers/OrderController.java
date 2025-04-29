package kz.cashsystem.order_service.controllers;

import kz.cashsystem.order_service.entity.Order;
import kz.cashsystem.order_service.records.CafeOrderRequest;
import kz.cashsystem.order_service.services.DeliveryService;
import kz.cashsystem.order_service.services.DineInService;
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
    private final DineInService dineInService;
    private final DeliveryService deliveryService;

    @PostMapping
    public ResponseEntity<Order> placeDineInOrder(@RequestBody CafeOrderRequest request) {
        Order order = dineInService.placeDineInOrder(request);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }
    @PostMapping("/delivery")
    public ResponseEntity<Order> placeDeliveryOrder(@RequestBody CafeOrderRequest request) {
        Order order = deliveryService.placeDeliveryOrder(request);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }
}
