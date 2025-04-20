package kz.cashsystem.order_service.services;

import kz.cashsystem.order_service.entity.Customer;
import kz.cashsystem.order_service.entity.GuestTable;
import kz.cashsystem.order_service.entity.Order;
import kz.cashsystem.order_service.entity.OrderItem;
import kz.cashsystem.order_service.enums.StatusEnum;
import kz.cashsystem.order_service.enums.TableStatus;
import kz.cashsystem.order_service.records.CafeOrderRequest;
import kz.cashsystem.order_service.records.OrderItemRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CafeService {
    private final CustomerService customerService;
    private final GuestTableService guestTableService;
    private final OrderService orderService;
    private final OrderItemService orderItemService;

    @Transactional
    public Order placeOrder(CafeOrderRequest request) {

        Customer customer = customerService.createCustomer(request.customer());


        GuestTable table = guestTableService.getById(request.tableId());
        if (table.getStatus() != TableStatus.AVAILABLE) {
            throw new IllegalStateException("Столик занят или зарезервирован");
        }

        Order order = new Order();
        order.setCustomerId(customer.getId());
        order.setTable(table);
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
            item.setPrice(itemReq.price());
            orderItems.add(orderItemService.create(item));
        }

        savedOrder.setOrderItems(orderItems);

        return savedOrder;
    }
}
