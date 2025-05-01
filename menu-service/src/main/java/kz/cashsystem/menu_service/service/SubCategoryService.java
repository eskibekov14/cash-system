package kz.cashsystem.menu_service.service;

import kz.cashsystem.menu_service.entity.Category;
import kz.cashsystem.menu_service.entity.SubCategory;
import kz.cashsystem.menu_service.repository.CategoryRepository;
import kz.cashsystem.menu_service.repository.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubCategoryService {

    private final SubCategoryRepository subCategoryRepository;

    @Transactional
    public SubCategory addCategory(SubCategory category) {
        return subCategoryRepository.save(category);
    }

    @Transactional(readOnly = true)
    public List<SubCategory> getAllCategories() {
        return subCategoryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public SubCategory getCategoryById(Long id) {
        return subCategoryRepository.findById(id).orElse(null);
    }

    @Transactional
    public SubCategory updateCategory(SubCategory updCategory) {
        return subCategoryRepository.save(updCategory);
    }

    @Transactional
    public void deleteCategory(Long id) {
        subCategoryRepository.deleteById(id);
    }
}
