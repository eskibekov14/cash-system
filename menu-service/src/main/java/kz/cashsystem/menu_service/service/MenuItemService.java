package kz.cashsystem.menu_service.service;

import kz.cashsystem.menu_service.dto.MenuFilter;
import kz.cashsystem.menu_service.entity.Category;
import kz.cashsystem.menu_service.entity.MenuItem;
import kz.cashsystem.menu_service.entity.SubCategory;
import kz.cashsystem.menu_service.repository.CategoryRepository;
import kz.cashsystem.menu_service.repository.MenuItemRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public MenuItem addMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    @Transactional(readOnly = true)
    public List<MenuItem> getAllMenuItems(MenuFilter filter) {
        List<MenuItem> items;

        if(filter.getCategoryId() != null && filter.getCategoryId() >= 0) {
            if(filter.getCategoryId() == 0) return menuItemRepository.findAll();
            List<SubCategory> subCategories = categoryRepository.findById(filter.getCategoryId()).get().getSubCategories();
            items = menuItemRepository.findBySubCategoryIn(subCategories);
        }
        if(filter.getSubCategoryId() != null && filter.getSubCategoryId() > 0) {
            items = menuItemRepository.findBySubCategory_Id(filter.getSubCategoryId());
        }else {
            items = menuItemRepository.findAll();
        }

        return items;
    }

    @Transactional(readOnly = true)
    public MenuItem getMenuItemById(Long id) {
        return menuItemRepository.findById(id).orElse(null);
    }

    @Transactional
    public MenuItem updateMenuItem(MenuItem updMenuItem) {
        return menuItemRepository.save(updMenuItem);
    }

    @Transactional
    public void deleteMenuItem(Long id) {
        menuItemRepository.deleteById(id);
    }
}


