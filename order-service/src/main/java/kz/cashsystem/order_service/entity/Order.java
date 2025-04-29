package kz.cashsystem.order_service.entity;

import jakarta.persistence.*;
import kz.cashsystem.order_service.enums.StatusEnum;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "customer_id", nullable = true)
    private Long customerId;
    @ManyToOne(fetch = FetchType.LAZY)
    private GuestTable table;
    private StatusEnum status;
    @CreationTimestamp
    private ZonedDateTime createdAt;
    @UpdateTimestamp
    private ZonedDateTime updatedAt;
    @OneToMany(fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;
}
