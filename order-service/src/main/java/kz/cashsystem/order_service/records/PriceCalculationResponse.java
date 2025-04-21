package kz.cashsystem.order_service.records;

import java.math.BigDecimal;

public record PriceCalculationResponse(
        BigDecimal basePrice,
        BigDecimal modifiersPrice
) {
    public BigDecimal totalPrice() {
        return basePrice.add(modifiersPrice);
    }
}
