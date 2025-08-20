package kz.cashsystem.order_service.config;

import kz.cashsystem.order_service.entity.GuestTable;
import kz.cashsystem.order_service.enums.TableStatus;
import kz.cashsystem.order_service.repositories.GuestTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private GuestTableRepository guestTableRepository;

    @Override
    public void run(String... args) throws Exception {
        // Создаем тестовые столы, если их нет
        if (guestTableRepository.count() == 0) {
            createTestTables();
            System.out.println("Test tables created");
        }
    }

    private void createTestTables() {
        GuestTable[] tables = {
            createTable("Стол 1", 2, "У окна"),
            createTable("Стол 2", 4, "У окна"),
            createTable("Стол 3", 6, "Центр зала"),
            createTable("Стол 4", 2, "Центр зала"),
            createTable("Стол 5", 4, "У стены"),
            createTable("Стол 6", 8, "VIP зона"),
            createTable("Стол 7", 2, "У окна"),
            createTable("Стол 8", 4, "У стены")
        };

        for (GuestTable table : tables) {
            guestTableRepository.save(table);
        }
    }

    private GuestTable createTable(String name, int capacity, String location) {
        GuestTable table = new GuestTable();
        table.setName(name);
        table.setCapacity(capacity);
        table.setLocation(location);
        table.setStatus(TableStatus.AVAILABLE);
        return table;
    }
}
