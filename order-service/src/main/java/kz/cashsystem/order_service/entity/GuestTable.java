package kz.cashsystem.order_service.entity;

import jakarta.persistence.*;
import kz.cashsystem.order_service.enums.TableStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "guestTables")
@Data
@NoArgsConstructor
public class GuestTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int capacity;
    private String location;
    private TableStatus status;
}
