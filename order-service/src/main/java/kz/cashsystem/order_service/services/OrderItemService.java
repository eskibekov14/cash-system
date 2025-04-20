package kz.cashsystem.order_service.services;

import jakarta.persistence.EntityNotFoundException;
import kz.cashsystem.order_service.entity.OrderItem;
import kz.cashsystem.order_service.repositories.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;

    @Transactional
    public OrderItem create(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }


    @Transactional(readOnly = true)
    public OrderItem getById(Long id) {
        return orderItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Позиция заказа не найдена: id = " + id));
    }

    @Transactional(readOnly = true)
    public List<OrderItem> getAll() {
        return orderItemRepository.findAll();
    }

    @Transactional
    public OrderItem update(Long id, OrderItem updatedItem) {
        OrderItem existing = getById(id);
        existing.setMenuItemId(updatedItem.getMenuItemId());
        existing.setModifiersId(updatedItem.getModifiersId());
        existing.setQuantity(updatedItem.getQuantity());
        existing.setPrice(updatedItem.getPrice());
        return orderItemRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        if (!orderItemRepository.existsById(id)) {
            throw new EntityNotFoundException("Позиция заказа не найдена для удаления: id = " + id);
        }
        orderItemRepository.deleteById(id);
    }
}
