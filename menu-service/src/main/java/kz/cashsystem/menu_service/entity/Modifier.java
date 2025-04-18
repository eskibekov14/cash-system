package kz.cashsystem.menu_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "modifiers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Modifier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal additionalPrice;
}