package kz.cashsystem.menu_service.config;

import kz.cashsystem.menu_service.entity.Category;
import kz.cashsystem.menu_service.entity.MenuItem;
import kz.cashsystem.menu_service.entity.Modifier;
import kz.cashsystem.menu_service.entity.SubCategory;
import kz.cashsystem.menu_service.repository.CategoryRepository;
import kz.cashsystem.menu_service.repository.MenuItemRepository;
import kz.cashsystem.menu_service.repository.ModifierRepository;
import kz.cashsystem.menu_service.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private ModifierRepository modifierRepository;

    @Override
    public void run(String... args) throws Exception {
        // Создаем тестовые данные, если их нет
        if (categoryRepository.count() == 0) {
            createTestData();
            System.out.println("Test menu data created");
        }
    }

    private void createTestData() {
        // Создаем подкатегории
        SubCategory appetizers = new SubCategory();
        appetizers.setName("Закуски");
        appetizers = subCategoryRepository.save(appetizers);

        SubCategory soups = new SubCategory();
        soups.setName("Супы");
        soups = subCategoryRepository.save(soups);

        SubCategory mainDishes = new SubCategory();
        mainDishes.setName("Горячие блюда");
        mainDishes = subCategoryRepository.save(mainDishes);

        SubCategory desserts = new SubCategory();
        desserts.setName("Десерты");
        desserts = subCategoryRepository.save(desserts);

        SubCategory drinks = new SubCategory();
        drinks.setName("Напитки");
        drinks = subCategoryRepository.save(drinks);

        SubCategory coffee = new SubCategory();
        coffee.setName("Кофе");
        coffee = subCategoryRepository.save(coffee);

        // Создаем категории
        Category mainMenu = new Category();
        mainMenu.setName("Основное меню");
        mainMenu = categoryRepository.save(mainMenu);

        Category barMenu = new Category();
        barMenu.setName("Барная карта");
        barMenu = categoryRepository.save(barMenu);

        Category coffeeMenu = new Category();
        coffeeMenu.setName("Кофейная карта");
        coffeeMenu = categoryRepository.save(coffeeMenu);

        // Создаем блюда
        MenuItem fries = new MenuItem();
        fries.setName("Картофель фри");
        fries.setDescription("Хрустящий картофель фри с соусом");
        fries.setBasePrice(new BigDecimal("900.00"));
        fries.setAvailable(true);
        fries.setImageUrl("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmZmY4ZDAiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjIwIiBmaWxsPSIjZmY5ODAwIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTIwIiByPSIxNSIgZmlsbD0iI2ZmOTgwMCIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjExMCIgcj0iMjAiIGZpbGw9IiNmZjk4MDAiLz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIxMzAiIHI9IjE4IiBmaWxsPSIjZmY5ODAwIi8+PGNpcmNsZSBjeD0iMzAwIiBjeT0iMTAwIiByPSIyMiIgZmlsbD0iI2ZmOTgwMCIvPjwvc3ZnPg==");
        fries.setSubCategory(appetizers);
        menuItemRepository.save(fries);

        MenuItem soup = new MenuItem();
        soup.setName("Куриный суп");
        soup.setDescription("Лёгкий суп с курицей и лапшой");
        soup.setBasePrice(new BigDecimal("1200.00"));
        soup.setAvailable(true);
        soup.setImageUrl("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmZmY4ZDAiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjgwIiBmaWxsPSIjZmZkNzAwIi8+PGNpcmNsZSBjeD0iMTgwIiBjeT0iMTMwIiByPSIxNSIgZmlsbD0iI2ZmOTgwMCIvPjxjaXJjbGUgY3g9IjIyMCIgY3k9IjE3MCIgcj0iMTIiIGZpbGw9IiNmZjk4MDAiLz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIxNDAiIHI9IjEwIiBmaWxsPSIjZmY5ODAwIi8+PC9zdmc+");
        soup.setSubCategory(soups);
        menuItemRepository.save(soup);

        MenuItem steak = new MenuItem();
        steak.setName("Стейк из курицы");
        steak.setDescription("Подаётся с овощами гриль");
        steak.setBasePrice(new BigDecimal("2200.00"));
        steak.setAvailable(true);
        steak.setImageUrl("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmZmY4ZDAiLz48cmVjdCB4PSI1MCIgeT0iMTAwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmOTgwMCIgcng9IjIwIi8+PGNpcmNsZSBjeD0iNzAiIGN5PSIxMjAiIHI9IjEwIiBmaWxsPSIjZmZmZmZmIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTQwIiByPSI4IiBmaWxsPSIjZmZmZmZmIi8+PGNpcmNsZSBjeD0iMTMwIiBjeT0iMTYwIiByPSIxMiIgZmlsbD0iI2ZmZmZmZiIvPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjEzMCIgcj0iMTAiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=");
        steak.setSubCategory(mainDishes);
        menuItemRepository.save(steak);

        MenuItem cheesecake = new MenuItem();
        cheesecake.setName("Чизкейк");
        cheesecake.setDescription("Домашний чизкейк с клубничным соусом");
        cheesecake.setBasePrice(new BigDecimal("1300.00"));
        cheesecake.setAvailable(true);
        cheesecake.setImageUrl("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmZmY4ZDAiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjYwIiBmaWxsPSIjZmZmZmZmIi8+PGNpcmNsZSBjeD0iMTgwIiBjeT0iMTMwIiByPSIxMCIgZmlsbD0iI2ZmOTgwMCIvPjxjaXJjbGUgY3g9IjIyMCIgY3k9IjE3MCIgcj0iOCIgZmlsbD0iI2ZmOTgwMCIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjE0MCIgcj0iMTIiIGZpbGw9IiNmZjk4MDAiLz48Y2lyY2xlIGN4PSIyODAiIGN5PSIxNjAiIHI9IjEwIiBmaWxsPSIjZmY5ODAwIi8+PC9zdmc+");
        cheesecake.setSubCategory(desserts);
        menuItemRepository.save(cheesecake);

        MenuItem cappuccino = new MenuItem();
        cappuccino.setName("Капучино");
        cappuccino.setDescription("Кофе с молоком и пенкой");
        cappuccino.setBasePrice(new BigDecimal("1100.00"));
        cappuccino.setAvailable(true);
        cappuccino.setImageUrl("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmZmY4ZDAiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjYwIiBmaWxsPSIjOGI1NDdmIi8+PGNpcmNsZSBjeD0iMTgwIiBjeT0iMTMwIiByPSIxMCIgZmlsbD0iI2ZmZmZmZiIvPjxjaXJjbGUgY3g9IjIyMCIgY3k9IjE3MCIgcj0iOCIgZmlsbD0iI2ZmZmZmZiIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjE0MCIgcj0iMTIiIGZpbGw9IiNmZmZmZmYiLz48Y2lyY2xlIGN4PSIyODAiIGN5PSIxNjAiIHI9IjEwIiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+");
        cappuccino.setSubCategory(coffee);
        menuItemRepository.save(cappuccino);

        // Создаем модификаторы
        Modifier cheeseModifier = new Modifier();
        cheeseModifier.setName("Доп. сыр");
        cheeseModifier.setAdditionalPrice(new BigDecimal("200.00"));
        modifierRepository.save(cheeseModifier);

        Modifier sauceModifier = new Modifier();
        sauceModifier.setName("Острый соус");
        sauceModifier.setAdditionalPrice(new BigDecimal("150.00"));
        modifierRepository.save(sauceModifier);

        Modifier noSugarModifier = new Modifier();
        noSugarModifier.setName("Без сахара");
        noSugarModifier.setAdditionalPrice(new BigDecimal("0.00"));
        modifierRepository.save(noSugarModifier);

        Modifier soyMilkModifier = new Modifier();
        soyMilkModifier.setName("Соевое молоко");
        soyMilkModifier.setAdditionalPrice(new BigDecimal("100.00"));
        modifierRepository.save(soyMilkModifier);
    }
}
