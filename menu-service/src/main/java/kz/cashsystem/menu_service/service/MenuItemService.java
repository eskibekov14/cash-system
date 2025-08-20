package kz.cashsystem.menu_service.service;

import kz.cashsystem.menu_service.dto.MenuFilter;
import kz.cashsystem.menu_service.dto.MenuItemDTO;
import kz.cashsystem.menu_service.entity.Category;
import kz.cashsystem.menu_service.entity.MenuItem;
import kz.cashsystem.menu_service.entity.SubCategory;
import kz.cashsystem.menu_service.repository.CategoryRepository;
import kz.cashsystem.menu_service.repository.MenuItemRepository;
import kz.cashsystem.menu_service.repository.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    @Transactional
    public MenuItem addMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    @Transactional
    public MenuItem addMenuItem(MenuItemDTO menuItemDTO) {
        MenuItem menuItem = new MenuItem();
        menuItem.setName(menuItemDTO.getName());
        menuItem.setDescription(menuItemDTO.getDescription());
        menuItem.setBasePrice(menuItemDTO.getBasePrice());
        menuItem.setAvailable(menuItemDTO.isAvailable());
        menuItem.setImageUrl(menuItemDTO.getImageUrl());
        
        // Устанавливаем подкатегорию
        SubCategory subCategory = subCategoryRepository.findById(menuItemDTO.getSubCategoryId())
            .orElseThrow(() -> new RuntimeException("SubCategory not found"));
        menuItem.setSubCategory(subCategory);
        
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
    public MenuItem updateMenuItem(Long id, MenuItemDTO menuItemDTO) {
        MenuItem existing = menuItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("MenuItem not found"));
        
        existing.setName(menuItemDTO.getName());
        existing.setDescription(menuItemDTO.getDescription());
        existing.setBasePrice(menuItemDTO.getBasePrice());
        existing.setAvailable(menuItemDTO.isAvailable());
        existing.setImageUrl(menuItemDTO.getImageUrl());
        
        // Обновляем подкатегорию если изменилась
        if (!existing.getSubCategory().getId().equals(menuItemDTO.getSubCategoryId())) {
            SubCategory subCategory = subCategoryRepository.findById(menuItemDTO.getSubCategoryId())
                .orElseThrow(() -> new RuntimeException("SubCategory not found"));
            existing.setSubCategory(subCategory);
        }
        
        return menuItemRepository.save(existing);
    }

    @Transactional
    public void deleteMenuItem(Long id) {
        menuItemRepository.deleteById(id);
    }
}


