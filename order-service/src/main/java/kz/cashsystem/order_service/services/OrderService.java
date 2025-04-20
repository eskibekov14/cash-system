package kz.cashsystem.order_service.services;

import jakarta.persistence.EntityNotFoundException;
import kz.cashsystem.order_service.entity.GuestTable;
import kz.cashsystem.order_service.entity.Order;
import kz.cashsystem.order_service.enums.StatusEnum;
import kz.cashsystem.order_service.enums.TableStatus;
import kz.cashsystem.order_service.repositories.GuestTableRepository;
import kz.cashsystem.order_service.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final GuestTableRepository guestTableRepository;
    @Transactional
    public Order createOrder(Order order) {
        GuestTable table = guestTableRepository.findById(order.getTable().getId())
                .orElseThrow(() -> new EntityNotFoundException("Стол не найден: id = " + order.getTable().getId()));
        if (table.getStatus() != TableStatus.AVAILABLE) {
            throw new IllegalStateException("Столик уже занят или зарезервирован");
        }
        table.setStatus(TableStatus.OCCUPIED);
        guestTableRepository.save(table);
        if (order.getStatus() == null) {
            order.setStatus(StatusEnum.OPEN);
        }
        return orderRepository.save(order);
    }
    @Transactional(readOnly = true)
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Заказ не найден: id = " + id));
    }
    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    @Transactional
    public Order updateOrderStatus(Long id, StatusEnum status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        if (status == StatusEnum.COMPLETED || status == StatusEnum.CANCELLED) {
            GuestTable table = order.getTable();
            table.setStatus(TableStatus.AVAILABLE);
            guestTableRepository.save(table);
        }
        return orderRepository.save(order);
    }
    @Transactional
    public void deleteOrder(Long id) {
        Order order = getOrderById(id);
        orderRepository.delete(order);
    }
}
