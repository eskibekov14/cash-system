// CashRegisterProperties.java
package kz.cashsystem.order_service.entity;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "cashregister.api")
public class CashRegisterProperties {
    private String url;
    private String login;
    private String password;
    private int timeout;
}