package kz.cashsystem.menu_service.service;

import kz.cashsystem.menu_service.entity.Category;
import kz.cashsystem.menu_service.entity.MenuItem;
import kz.cashsystem.menu_service.repository.MenuItemRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    @Transactional
    public MenuItem addMenuItem(MenuItem menuItem){
        return menuItemRepository.save(menuItem);
    }
    @Transactional(readOnly = true)
    public List<MenuItem> getAllMenuItems(){
        return menuItemRepository.findAll();
    }
    @Transactional(readOnly = true)
    public MenuItem getMenuItemById(Long id){
        return menuItemRepository.findById(id).orElse(null);
    }
    @Transactional
    public MenuItem updateMenuItem(MenuItem updMenuItem){
        return menuItemRepository.save(updMenuItem);
    }
    @Transactional
    public void deleteMenuItem(Long id){
        menuItemRepository.deleteById(id);
    }
}


