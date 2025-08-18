package kz.cashsystem.menu_service.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Название категории не должно быть пустым")
    @Size(max = 100, message = "Название категории не должно превышать 100 символов")
    private String name;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "categories_sub_categories",
            joinColumns = @JoinColumn(name = "category_id"),
            inverseJoinColumns = @JoinColumn(name = "sub_category_id")
    )
    private List<SubCategory> subCategories;
}