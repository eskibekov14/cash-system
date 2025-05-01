package kz.cashsystem.order_service.services;

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
public class TakeAwayService {
    private final OrderService orderService;
    private final OrderItemService orderItemService;
    private final MenuServiceClient menuServiceClient;

    @Transactional
    public Order placeTakeawayOrder(CafeOrderRequest request) {
        Order order = new Order();
        order.setCustomerId(null); // пользователь не зарегистрирован
        order.setStatus(StatusEnum.OPEN);
        order.setOrderItems(new ArrayList<>());
        Order savedOrder = orderService.createOrder(order);

        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemRequest itemReq : request.items()) {
            OrderItem item = new OrderItem();
            item.setOrder(savedOrder);
            item.setMenuItemId(itemReq.menuItemId());
            item.setModifiersId(itemReq.modifiersId());
            item.setQuantity(itemReq.quantity());

            PriceCalculationResponse priceResponse = menuServiceClient.calculatePrice(
                    new PriceCalculationRequest(itemReq.menuItemId(), itemReq.modifiersId())
            );
            item.setPrice(priceResponse.totalPrice());

            orderItems.add(orderItemService.create(item));
        }

        savedOrder.setOrderItems(orderItems);
        return savedOrder;
    }
}
