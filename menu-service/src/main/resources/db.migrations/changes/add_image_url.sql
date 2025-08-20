-- Добавление поля imageUrl для изображений блюд
ALTER TABLE "menu_items" ADD COLUMN "imageUrl" VARCHAR(500);

-- Добавление комментария к полю
COMMENT ON COLUMN "menu_items"."imageUrl" IS 'URL изображения блюда';
