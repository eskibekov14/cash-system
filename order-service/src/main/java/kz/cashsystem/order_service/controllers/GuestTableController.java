package kz.cashsystem.order_service.controllers;

import kz.cashsystem.order_service.entity.GuestTable;
import kz.cashsystem.order_service.services.GuestTableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
public class GuestTableController {
    private final GuestTableService guestTableService;

    @GetMapping
    public ResponseEntity<List<GuestTable>> getAll() {
        return ResponseEntity.ok(guestTableService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GuestTable> getById(@PathVariable Long id) {
        return ResponseEntity.ok(guestTableService.getById(id));
    }

    @PostMapping
    public ResponseEntity<GuestTable> create(@RequestBody GuestTable table) {
        return ResponseEntity.ok(guestTableService.create(table));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GuestTable> update(@PathVariable Long id, @RequestBody GuestTable table) {
        return ResponseEntity.ok(guestTableService.update(id, table));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        guestTableService.delete(id);
        return ResponseEntity.noContent().build();
    }
}


