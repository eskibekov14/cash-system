package kz.cashsystem.order_service.entity;

import jakarta.persistence.*;
import kz.cashsystem.order_service.enums.MethodEnum;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Order order;
    private BigDecimal amount;
    private MethodEnum method;
    @CreationTimestamp
    private ZonedDateTime paymentDate;
}
