package kz.cashsystem.order_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ShiftResponse {
    /**
     * Уникальный идентификатор смены (например, UUID или номер).
     */
    private String shiftId;

    /**
     * Время открытия/закрытия смены.
     */
    private LocalDateTime timestamp;

    /**
     * Статус операции (например, "OPENED", "CLOSED").
     */
    private String status;
}

