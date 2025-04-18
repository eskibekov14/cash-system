package kz.cashsystem.menu_service.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "menuItems")
@Data
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private BigDecimal basePrice;
    private boolean available;

    @ManyToOne
    private Category category;

    @OneToMany
    private List<Modifier> modifiers;
}