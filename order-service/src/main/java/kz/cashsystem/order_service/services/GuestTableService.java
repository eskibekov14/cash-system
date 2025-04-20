package kz.cashsystem.order_service.services;

import jakarta.persistence.EntityNotFoundException;
import kz.cashsystem.order_service.entity.GuestTable;
import kz.cashsystem.order_service.repositories.GuestTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GuestTableService {
    private final GuestTableRepository guestTableRepository;
    @Transactional
    public GuestTable create(GuestTable table) {
        return guestTableRepository.save(table);
    }
    @Transactional(readOnly = true)
    public GuestTable getById(Long id) {
        return guestTableRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Столик не найден: id = " + id));
    }
    @Transactional(readOnly = true)
    public List<GuestTable> getAll() {
        return guestTableRepository.findAll();
    }
    @Transactional
    public GuestTable update(Long id, GuestTable updated) {
        GuestTable existing = getById(id);
        existing.setName(updated.getName());
        existing.setCapacity(updated.getCapacity());
        existing.setLocation(updated.getLocation());
        existing.setStatus(updated.getStatus());
        return guestTableRepository.save(existing);
    }
    @Transactional
    public void delete(Long id) {
        if (!guestTableRepository.existsById(id)) {
            throw new EntityNotFoundException("Столик не найден для удаления: id = " + id);
        }
        guestTableRepository.deleteById(id);
    }
}
