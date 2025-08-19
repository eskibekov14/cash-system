-- 1. categories
CREATE TABLE categories (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(100) NOT NULL
);

-- 2. sub_categories
CREATE TABLE sub_categories (
                                id SERIAL PRIMARY KEY,
                                name VARCHAR(100) NOT NULL
);

-- 3. связь categories ↔ sub_categories (ManyToMany)
CREATE TABLE categories_sub_categories (
                                           category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
                                           sub_category_id BIGINT NOT NULL REFERENCES sub_categories(id) ON DELETE CASCADE,
                                           PRIMARY KEY (category_id, sub_category_id)
);

-- 4. inventories
CREATE TABLE inventories (
                             id SERIAL PRIMARY KEY,
                             name VARCHAR(255) NOT NULL,
                             description VARCHAR(500),
                             unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price > 0),
                             reorder_level INTEGER
);

-- 5. stock_movements
CREATE TABLE stock_movements (
                                 id SERIAL PRIMARY KEY,
                                 inventory_item_id BIGINT REFERENCES inventories(id) ON DELETE SET NULL,
                                 movement_type VARCHAR(50),
                                 quantity_change INTEGER NOT NULL,
                                 movement_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                                 reason TEXT
);

-- 6. suppliers
CREATE TABLE suppliers (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           email VARCHAR(255),
                           phone VARCHAR(50) NOT NULL
);

-- 7. menu_items
CREATE TABLE menu_items (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            description VARCHAR(500),
                            base_price NUMERIC(10, 2) NOT NULL CHECK (base_price > 0),
                            available BOOLEAN DEFAULT TRUE,
                            sub_category_id BIGINT NOT NULL REFERENCES sub_categories(id)
);

-- 8. modifiers — теперь с внешним ключом на menu_items
CREATE TABLE modifiers (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           additional_price NUMERIC(10, 2) NOT NULL CHECK (additional_price >= 0),
                           menu_item_id BIGINT REFERENCES menu_items(id) ON DELETE CASCADE
);
-- ===== sub_categories =====
INSERT INTO sub_categories (name) VALUES
                                      ('Закуски'),
                                      ('Супы'),
                                      ('Горячие блюда'),
                                      ('Десерты'),
                                      ('Напитки'),
                                      ('Кофе');

-- ===== categories =====
INSERT INTO categories (name) VALUES
                                  ('Основное меню'),
                                  ('Барная карта'),
                                  ('Кофейная карта');

-- ===== categories_sub_categories =====
INSERT INTO categories_sub_categories (category_id, sub_category_id) VALUES
                                                                         (1, 1), (1, 2), (1, 3), (1, 4),
                                                                         (2, 5),
                                                                         (3, 6);

-- ===== inventories =====
INSERT INTO inventories (name, description, unit_price, reorder_level) VALUES
                                                                           ('Картофель', 'Свежий картофель для фри и пюре', 150.00, 20),
                                                                           ('Куриное филе', 'Филе охлажденное', 1300.00, 10),
                                                                           ('Молоко', 'Молоко 3.2% жирности', 450.00, 15),
                                                                           ('Кофе арабика', 'Зёрна 100% арабика', 2200.00, 5),
                                                                           ('Сахар', 'Сахар белый', 300.00, 10);

-- ===== suppliers =====
INSERT INTO suppliers (name, email, phone) VALUES
                                               ('ТОО FreshFood', 'sales@freshfood.kz', '+77012345678'),
                                               ('CoffeeImport Ltd', 'support@coffeeimport.com', '+77771234567'),
                                               ('FoodBase', 'contact@foodbase.kz', '+77005553322');

-- ===== stock_movements =====
INSERT INTO stock_movements (inventory_item_id, movement_type, quantity_change, reason) VALUES
                                                                                            (1, 'IN', 100, 'Закупка'),
                                                                                            (2, 'IN', 50, 'Закупка'),
                                                                                            (4, 'IN', 20, 'Импорт зерна'),
                                                                                            (3, 'OUT', 10, 'Использование на кухне');

-- ===== menu_items =====
INSERT INTO menu_items (name, description, base_price, available, sub_category_id) VALUES
                                                                                       ('Картофель фри', 'Хрустящий картофель фри с соусом', 900.00, true, 1),
                                                                                       ('Куриный суп', 'Лёгкий суп с курицей и лапшой', 1200.00, true, 2),
                                                                                       ('Стейк из курицы', 'Подаётся с овощами гриль', 2200.00, true, 3),
                                                                                       ('Чизкейк', 'Домашний чизкейк с клубничным соусом', 1300.00, true, 4),
                                                                                       ('Капучино', 'Кофе с молоком и пенкой', 1100.00, true, 6);

-- ===== modifiers (указан menu_item_id) =====
-- Картофель фри (id = 1)
INSERT INTO modifiers (name, additional_price, menu_item_id) VALUES
                                                                 ('Доп. сыр', 200.00, 1),
                                                                 ('Острый соус', 150.00, 1);

-- Капучино (id = 5)
INSERT INTO modifiers (name, additional_price, menu_item_id) VALUES
                                                                 ('Без сахара', 0.00, 5),
                                                                 ('Соевое молоко', 100.00, 5);