package kz.cashsystem.order_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Order order;

    private Long menuItemId;
    @ElementCollection
    @CollectionTable(name = "order_item_modifiers")
    @Column(name = "modifier_id")
    private List<Long> modifiersId;
    
    private int quantity;
    private BigDecimal price;
    
}
