package kz.cashsystem.order_service.records;

import kz.cashsystem.order_service.entity.Customer;

import java.util.List;

public record CafeOrderRequest(Customer customer,
                               Long tableId,
                               List<OrderItemRequest> items)
{}
