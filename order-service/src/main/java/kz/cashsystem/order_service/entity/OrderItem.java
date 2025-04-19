package kz.cashsystem.order_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "orderItems")
@Data
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Order order;

    private Long menuItemId;
    private String menuItemName;
    private BigDecimal menuItemPrice;
    private List<Long> modifiersId;
    
    private int quantity;
    private BigDecimal price;
    
}
