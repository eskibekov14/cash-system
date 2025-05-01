package kz.cashsystem.order_service.services;

import kz.cashsystem.order_service.entity.Payment;

public interface PaymentProvider {
    boolean process(Payment payment);
}
