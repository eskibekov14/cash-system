package kz.cashsystem.menu_service.service;

import kz.cashsystem.menu_service.entity.Category;
import kz.cashsystem.menu_service.entity.Modifier;
import kz.cashsystem.menu_service.repository.ModifierRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ModifierService {
    private final ModifierRepository modifierRepository;
    @Transactional
    public Modifier addModifier(Modifier modifier){
        return modifierRepository.save(modifier);
    }
    @Transactional(readOnly = true)
    public List<Modifier> getAllModifiers(){
        return modifierRepository.findAll();
    }
    @Transactional(readOnly = true)
    public Modifier getModifierById(Long id){
        return modifierRepository.findById(id).orElse(null);
    }
    @Transactional
    public Modifier updateModifier(Modifier updModifier){
        return modifierRepository.save(updModifier);
    }
    @Transactional
    public void deleteModifier(Long id){
        modifierRepository.deleteById(id);
    }
}

