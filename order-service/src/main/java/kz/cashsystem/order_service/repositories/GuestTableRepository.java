package kz.cashsystem.order_service.repositories;

import kz.cashsystem.order_service.entity.GuestTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestTableRepository extends JpaRepository<GuestTable,Long> {

}
