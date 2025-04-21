package kz.cashsystem.menu_service.service;

import jakarta.persistence.EntityNotFoundException;
import kz.cashsystem.menu_service.entity.MenuItem;
import kz.cashsystem.menu_service.entity.Modifier;
import kz.cashsystem.menu_service.records.PriceCalculationResponse;
import kz.cashsystem.menu_service.repository.MenuItemRepository;
import kz.cashsystem.menu_service.repository.ModifierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PriceCalculationService {
    private final MenuItemRepository menuItemRepository;
    private final ModifierRepository modifierRepository;

    @Transactional
    public PriceCalculationResponse calculatePrice(Long menuItemId, List<Long> modifierIds) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new EntityNotFoundException("MenuItem not found: id = " + menuItemId));

        BigDecimal basePrice = menuItem.getBasePrice();

        List<Modifier> modifiers = modifierRepository.findAllById(modifierIds);
        BigDecimal modifiersPrice = modifiers.stream()
                .map(Modifier::getAdditionalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new PriceCalculationResponse(basePrice, modifiersPrice);
    }
}
