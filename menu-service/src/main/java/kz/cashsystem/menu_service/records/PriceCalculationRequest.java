package kz.cashsystem.menu_service.records;

import java.util.List;

public record PriceCalculationRequest(
        Long menuItemId,
        List<Long> modifiersId
) {}
