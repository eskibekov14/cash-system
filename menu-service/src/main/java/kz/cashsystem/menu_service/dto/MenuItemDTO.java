package kz.cashsystem.menu_service.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class MenuItemDTO {
    @NotBlank(message = "Название не должно быть пустым")
    private String name;
    
    @Size(max = 500, message = "Описание не должно превышать 500 символов")
    private String description;
    
    @NotNull(message = "Цена обязательна")
    @DecimalMin(value = "0.0", inclusive = false, message = "Цена должна быть больше 0")
    private BigDecimal basePrice;
    
    private boolean available = true;
    
    @Size(max = 500, message = "URL изображения не должен превышать 500 символов")
    private String imageUrl;
    
    @NotNull(message = "ID подкатегории обязателен")
    private Long subCategoryId;
    
    private List<Long> modifierIds;
}
