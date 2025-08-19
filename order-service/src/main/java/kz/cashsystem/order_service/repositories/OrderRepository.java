package kz.cashsystem.order_service.repositories;

import kz.cashsystem.order_service.entity.Order;
import kz.cashsystem.order_service.records.OrderListItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    @Query("select new kz.cashsystem.order_service.records.OrderListItem(o.id, o.status, o.customerId, (CASE WHEN o.table IS NULL THEN NULL ELSE o.table.id END), o.createdAt) from Order o")
    java.util.List<OrderListItem> findAllListItems();
}
