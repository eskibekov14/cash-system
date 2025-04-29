package kz.cashsystem.order_service.services;

import kz.cashsystem.order_service.entity.Customer;
import kz.cashsystem.order_service.entity.Order;
import kz.cashsystem.order_service.entity.OrderItem;
import kz.cashsystem.order_service.enums.StatusEnum;
import kz.cashsystem.order_service.records.CafeOrderRequest;
import kz.cashsystem.order_service.records.OrderItemRequest;
import kz.cashsystem.order_service.records.PriceCalculationRequest;
import kz.cashsystem.order_service.records.PriceCalculationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeliveryService {
    private final CustomerService customerService;
    private final OrderService orderService;
    private final OrderItemService orderItemService;
    private final MenuServiceClient menuServiceClient;

    @Transactional
    public Order placeDeliveryOrder(CafeOrderRequest request) {

        Customer customer = customerService.createCustomer(request.customer());

        Order order = new Order();
        order.setCustomerId(customer.getId());
        order.setStatus(StatusEnum.OPEN);
        order.setOrderItems(new ArrayList<>());

        Order savedOrder = orderService.createOrder(order);

        List<OrderItem> orderItems = createOrderItems(request.items(), savedOrder);
        savedOrder.setOrderItems(orderItems);

        return savedOrder;
    }

    private List<OrderItem> createOrderItems(List<OrderItemRequest> items, Order order) {
        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemRequest itemReq : items) {
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setMenuItemId(itemReq.menuItemId());
            item.setModifiersId(itemReq.modifiersId());
            item.setQuantity(itemReq.quantity());

            PriceCalculationRequest priceRequest = new PriceCalculationRequest(
                    itemReq.menuItemId(),
                    itemReq.modifiersId()
            );
            PriceCalculationResponse priceResponse = menuServiceClient.calculatePrice(priceRequest);

            item.setPrice(priceResponse.totalPrice());
            orderItems.add(orderItemService.create(item));
        }
        return orderItems;
    }
}
