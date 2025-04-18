package kz.cashsystem.menu_service.service;

import kz.cashsystem.menu_service.entity.Category;
import kz.cashsystem.menu_service.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    public Category addCategory(Category category){
        return categoryRepository.save(category);
    }
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }
    public Category getCategoryById(Long id){
        return categoryRepository.findById(id).orElse(null);
    }
    public Category updateCategory(Category updCategory){
        return categoryRepository.save(updCategory);
    }
    public void deleteCategory(Long id){
        categoryRepository.deleteById(id);
    }
}
