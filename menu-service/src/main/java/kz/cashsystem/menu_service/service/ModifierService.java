package kz.cashsystem.menu_service.service;

import kz.cashsystem.menu_service.repository.ModifierRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ModifierService {

    private final ModifierRepository modifierRepository;

}
