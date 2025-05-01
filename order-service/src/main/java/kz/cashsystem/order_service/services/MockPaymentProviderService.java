package kz.cashsystem.order_service.services;

import kz.cashsystem.order_service.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class MockPaymentProviderService implements PaymentProvider{
    @Override
    public boolean process(Payment payment) {
        // Эмуляция успеха платежа
        System.out.println("Эмуляция оплаты для заказа: " + payment.getOrder().getId());
        return true;
    }
}
