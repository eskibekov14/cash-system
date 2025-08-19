package kz.cashsystem.order_service.controllers;

import kz.cashsystem.order_service.entity.Order;
import kz.cashsystem.order_service.entity.GuestTable;
import kz.cashsystem.order_service.records.CafeOrderRequest;
import kz.cashsystem.order_service.services.DeliveryService;
import kz.cashsystem.order_service.services.DineInService;
import kz.cashsystem.order_service.services.OrderService;
import kz.cashsystem.order_service.services.TakeAwayService;
import kz.cashsystem.order_service.services.GuestTableService;
import kz.cashsystem.order_service.records.OrderListItem;
import kz.cashsystem.order_service.enums.StatusEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {
    private final DineInService dineInService;
    private final DeliveryService deliveryService;
    private final TakeAwayService takeAwayService;
    private final OrderService orderService;
    private final GuestTableService guestTableService;

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
    @PostMapping("/takeaway")
    public ResponseEntity<Order> placeTakeawayOrder(@RequestBody CafeOrderRequest request) {
        Order order = takeAwayService.placeTakeawayOrder(request);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<java.util.List<OrderListItem>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrderListItems());
    }

    @GetMapping("/list")
    public ResponseEntity<java.util.List<OrderListItem>> getAllOrdersList() {
        return ResponseEntity.ok(orderService.getAllOrderListItems());
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestBody StatusUpdateRequest request) {
        Order updatedOrder = orderService.updateOrderStatus(orderId, request.status());
        return ResponseEntity.ok(updatedOrder);
    }

    @GetMapping("/tables")
    public ResponseEntity<java.util.List<GuestTable>> getAllTables() {
        return ResponseEntity.ok(guestTableService.getAll());
    }

    // Record для обновления статуса
    public record StatusUpdateRequest(StatusEnum status) {}
}
