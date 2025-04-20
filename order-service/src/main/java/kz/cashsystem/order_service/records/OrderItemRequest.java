package kz.cashsystem.order_service.records;

import java.math.BigDecimal;
import java.util.List;

public record OrderItemRequest(Long menuItemId,
                               List<Long> modifiersId,
                               int quantity,
                               BigDecimal price)
{}
