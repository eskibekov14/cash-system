package kz.cashsystem.menu_service.controllers;

import jakarta.validation.Valid;
import kz.cashsystem.menu_service.entity.Modifier;
import kz.cashsystem.menu_service.service.ModifierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modifier")
@RequiredArgsConstructor
public class ModifierController {
    private final ModifierService modifierService;

    @GetMapping
    public ResponseEntity<List<Modifier>> getAllModifiers() {
        return ResponseEntity.ok(modifierService.getAllModifiers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Modifier> getModifierById(@PathVariable Long id) {
        Modifier modifier = modifierService.getModifierById(id);
        if (modifier != null) {
            return ResponseEntity.ok(modifier);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    public ResponseEntity<Modifier> addModifier(@Valid @RequestBody Modifier modifier) {
        Modifier saved = modifierService.addModifier(modifier);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Modifier> updateModifier(@PathVariable Long id, @Valid @RequestBody Modifier modifier) {
        Modifier existing = modifierService.getModifierById(id);
        if (existing != null) {
            modifier.setId(id);
            Modifier updated = modifierService.updateModifier(modifier);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModifier(@PathVariable Long id) {
        Modifier existing = modifierService.getModifierById(id);
        if (existing != null) {
            modifierService.deleteModifier(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
