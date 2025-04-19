package kz.cashsystem.order_service.entity;

import jakarta.persistence.*;
import kz.cashsystem.order_service.enums.ReserveStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.ZonedDateTime;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private GuestTable table;
    @ManyToOne(fetch = FetchType.LAZY)
    private Customer customer;
    @CreationTimestamp
    private ZonedDateTime reservationTime;
    private ReserveStatus status;
}
