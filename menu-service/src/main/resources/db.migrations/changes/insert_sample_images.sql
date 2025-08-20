-- Примеры URL изображений для блюд
-- Эти URL должны указывать на реальные изображения, загруженные в систему

-- Для пиццы
UPDATE "menu_items" 
SET "imageUrl" = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center'
WHERE name ILIKE '%пицца%' OR name ILIKE '%pizza%';

-- Для бургеров
UPDATE "menu_items" 
SET "imageUrl" = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center'
WHERE name ILIKE '%бургер%' OR name ILIKE '%burger%';

-- Для суши
UPDATE "menu_items" 
SET "imageUrl" = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&crop=center'
WHERE name ILIKE '%суши%' OR name ILIKE '%sushi%';

-- Для напитков
UPDATE "menu_items" 
SET "imageUrl" = 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop&crop=center'
WHERE name ILIKE '%напиток%' OR name ILIKE '%drink%' OR name ILIKE '%кофе%' OR name ILIKE '%чай%';

-- Для десертов
UPDATE "menu_items" 
SET "imageUrl" = 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop&crop=center'
WHERE name ILIKE '%десерт%' OR name ILIKE '%dessert%' OR name ILIKE '%торт%' OR name ILIKE '%cake%';

-- Для салатов
UPDATE "menu_items" 
SET "imageUrl" = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center'
WHERE name ILIKE '%салат%' OR name ILIKE '%salad%';

-- Для основных блюд (если не попало в другие категории)
UPDATE "menu_items" 
SET "imageUrl" = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'
WHERE "imageUrl" IS NULL;
