package kz.cashsystem.order_service.config;

import kz.cashsystem.order_service.entity.CashRegisterProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(CashRegisterProperties.class)
public class CashRegisterConfig {
}
