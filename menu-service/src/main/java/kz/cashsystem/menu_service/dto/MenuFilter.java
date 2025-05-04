package kz.cashsystem.menu_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuFilter {
    private Long categoryId;
    private Long subCategoryId;
}
