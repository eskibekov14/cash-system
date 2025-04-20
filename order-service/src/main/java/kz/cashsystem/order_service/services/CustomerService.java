package kz.cashsystem.order_service.services;

import jakarta.persistence.EntityNotFoundException;


import kz.cashsystem.order_service.entity.Customer;
import kz.cashsystem.order_service.repositories.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    @Transactional
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }
    @Transactional(readOnly = true)
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Клиент не найден: id = " + id));
    }
    @Transactional(readOnly = true)
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
    @Transactional
    public Customer updateCustomer(Long id, Customer updatedCustomer) {
        Customer existing = getCustomerById(id);
        existing.setName(updatedCustomer.getName());
        existing.setEmail(updatedCustomer.getEmail());
        existing.setPhone(updatedCustomer.getPhone());
        return customerRepository.save(existing);
    }
    @Transactional
    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new EntityNotFoundException("Клиент для удаления не найден: id = " + id);
        }
        customerRepository.deleteById(id);
    }
}
