package kz.cashsystem.order_service.records;

import java.time.ZonedDateTime;
import kz.cashsystem.order_service.enums.StatusEnum;

public record OrderListItem(
        Long id,
        StatusEnum status,
        Long customerId,
        Long tableId,
        ZonedDateTime createdAt
) {}


