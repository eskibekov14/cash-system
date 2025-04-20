package kz.cashsystem.order_service.services;

import jakarta.persistence.EntityNotFoundException;
import kz.cashsystem.order_service.entity.GuestTable;
import kz.cashsystem.order_service.entity.Reservation;
import kz.cashsystem.order_service.enums.ReserveStatus;
import kz.cashsystem.order_service.enums.TableStatus;
import kz.cashsystem.order_service.repositories.GuestTableRepository;
import kz.cashsystem.order_service.repositories.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;

    private final GuestTableRepository guestTableRepository;

    @Transactional
    public Reservation create(Reservation reservation) {
        GuestTable table = guestTableRepository.findById(reservation.getTable().getId())
                .orElseThrow(() -> new EntityNotFoundException("Стол не найден: id = " + reservation.getTable().getId()));

        if (table.getStatus() != TableStatus.AVAILABLE) {
            throw new IllegalStateException("Столик недоступен для бронирования (занят или уже зарезервирован)");
        }

        table.setStatus(TableStatus.RESERVED);
        guestTableRepository.save(table);

        reservation.setStatus(ReserveStatus.PENDING);
        return reservationRepository.save(reservation);
    }

    @Transactional(readOnly = true)
    public Reservation getById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Бронь не найдена: id = " + id));
    }

    @Transactional(readOnly = true)
    public List<Reservation> getAll() {
        return reservationRepository.findAll();
    }

    @Transactional
    public Reservation updateStatus(Long id, ReserveStatus status) {
        Reservation reservation = getById(id);
        reservation.setStatus(status);

        if (status == ReserveStatus.CANCELLED) {
            GuestTable table = reservation.getTable();
            table.setStatus(TableStatus.AVAILABLE);
            guestTableRepository.save(table);
        }

        return reservationRepository.save(reservation);
    }

    @Transactional
    public void delete(Long id) {
        Reservation reservation = getById(id);

        if (reservation.getStatus() != ReserveStatus.CANCELLED) {
            GuestTable table = reservation.getTable();
            table.setStatus(TableStatus.AVAILABLE);
            guestTableRepository.save(table);
        }

        reservationRepository.deleteById(id);
    }
}
