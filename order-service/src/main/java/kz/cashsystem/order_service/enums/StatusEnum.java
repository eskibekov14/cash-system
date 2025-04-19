package kz.cashsystem.order_service.enums;

import lombok.Getter;

@Getter
public enum StatusEnum {
    OPEN,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED,
}
