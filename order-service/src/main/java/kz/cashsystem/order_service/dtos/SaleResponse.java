package kz.cashsystem.order_service.dtos;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class SaleResponse {
    private String receiptNumber;
    private LocalDateTime timestamp;
    private BigDecimal total;
}