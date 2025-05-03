package kz.cashsystem.menu_service.repository;

import kz.cashsystem.menu_service.entity.MenuItem;
import kz.cashsystem.menu_service.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findBySubCategoryIn(List<SubCategory> subCategories);
    List<MenuItem> findBySubCategory_Id(Long id);
}
