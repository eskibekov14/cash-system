package kz.cashsystem.order_service.services;

import jakarta.persistence.EntityNotFoundException;
import kz.cashsystem.order_service.entity.Payment;
import kz.cashsystem.order_service.enums.PaymentStatus;
import kz.cashsystem.order_service.repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentProvider paymentProvider; //типа каспи

    @Transactional
    public Payment create(Payment payment) {

        if (payment.getAmount() == null || payment.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Сумма платежа должна быть положительной");
        }

        boolean success = paymentProvider.process(payment);
        if (!success) {
            throw new IllegalStateException("Платёж не прошёл (мок)");
        }

        payment.setStatus(PaymentStatus.PAID); // устанавливаем статус
        return paymentRepository.save(payment);
    }

    @Transactional(readOnly = true)
    public Payment getById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Платёж не найден: id = " + id));
    }

    @Transactional(readOnly = true)
    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    @Transactional
    public void delete(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new EntityNotFoundException("Платёж не найден для удаления: id = " + id);
        }

        paymentRepository.deleteById(id);
    }
}
