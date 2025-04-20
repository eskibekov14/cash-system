package kz.cashsystem.menu_service.service;

import kz.cashsystem.menu_service.entity.Category;
import kz.cashsystem.menu_service.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    @Transactional
    public Category addCategory(Category category){
        return categoryRepository.save(category);
    }
    @Transactional(readOnly = true)
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }
    @Transactional(readOnly = true)
    public Category getCategoryById(Long id){
        return categoryRepository.findById(id).orElse(null);
    }
    @Transactional
    public Category updateCategory(Category updCategory){
        return categoryRepository.save(updCategory);
    }
    @Transactional
    public void deleteCategory(Long id){
        categoryRepository.deleteById(id);
    }
}
