package kz.cashsystem.order_service.dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class SaleRequest {
    private String itemCode;
    private int quantity;
    private BigDecimal price;
}
