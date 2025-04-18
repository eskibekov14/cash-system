package kz.cashsystem.menu_service.service;

import kz.cashsystem.menu_service.entity.Category;
import kz.cashsystem.menu_service.entity.MenuItem;
import kz.cashsystem.menu_service.repository.MenuItemRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    public MenuItem addMenuItem(MenuItem menuItem){
        return menuItemRepository.save(menuItem);
    }
    public List<MenuItem> getAllMenuItems(){
        return menuItemRepository.findAll();
    }
    public MenuItem getMenuItemById(Long id){
        return menuItemRepository.findById(id).orElse(null);
    }
    public MenuItem updateMenuItem(MenuItem updMenuItem){
        return menuItemRepository.save(updMenuItem);
    }
    public void deleteCategory(Long id){
        menuItemRepository.deleteById(id);
    }
}


