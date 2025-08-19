import { useEffect, useState } from 'react';
import { MenuAPI, MenuItem, CategoryAPI, Category, SubCategory } from '../api/http';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardContent, Button, Chip, Box, TextField, CardActions, IconButton, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SideNav from '../components/SideNav';

type CartLine = { menuItemId: number; modifiersId: number[]; quantity: number };

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    CategoryAPI.listCategories().then(setCategories);
    CategoryAPI.listSubCategories().then(setSubCategories);
  }, []);

  useEffect(() => {
    MenuAPI.listItems({ categoryId: activeCategory ?? undefined, subCategoryId: activeSubCategory ?? undefined }).then(setItems);
  }, [activeCategory, activeSubCategory]);

  function toggleModifier(line: CartLine, modId: number) {
    const has = line.modifiersId.includes(modId);
    line.modifiersId = has ? line.modifiersId.filter((m) => m !== modId) : [...line.modifiersId, modId];
    setCart([...cart]);
  }

  function addToCart(item: MenuItem) {
    setCart([...cart, { menuItemId: item.id, modifiersId: [], quantity: 1 }]);
  }
  function decrementLine(index: number) {
    const next = [...cart];
    const line = next[index];
    if (!line) return;
    if (line.quantity > 1) {
      line.quantity -= 1;
      setCart(next);
    } else {
      setCart(next.filter((_, i) => i !== index));
    }
  }
  function incrementLine(index: number) {
    const next = [...cart];
    const line = next[index];
    if (!line) return;
    line.quantity += 1;
    setCart(next);
  }

  return (
    <Box>
      <SideNav title="Меню" cartCount={cart.length} />
      <Container sx={{ py: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => nav(-1)} sx={{ mb: 3, fontSize: '1.2rem', py: 2, px: 3 }}>Назад</Button>
        
        {/* Category Filters */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
            Выберите категорию
          </Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
            <Chip 
              label="Все категории" 
              color={!activeCategory ? 'primary' : 'default'} 
              onClick={() => { setActiveCategory(null); setActiveSubCategory(null); }}
              sx={{ fontSize: '1.1rem', height: 48, '& .MuiChip-label': { px: 3 } }}
            />
            {categories.map(c => (
              <Chip 
                key={c.id} 
                label={c.name} 
                color={activeCategory === c.id ? 'primary' : 'default'} 
                onClick={() => { setActiveCategory(c.id); setActiveSubCategory(null); }}
                sx={{ fontSize: '1.1rem', height: 48, '& .MuiChip-label': { px: 3 } }}
              />
            ))}
          </Stack>
        </Box>

        {/* Subcategory Filters */}
        {activeCategory && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'secondary.main' }}>
              Подкатегория
            </Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
              <Chip 
                label="Все подкатегории" 
                color={!activeSubCategory ? 'secondary' : 'default'} 
                onClick={() => setActiveSubCategory(null)}
                sx={{ fontSize: '1.1rem', height: 48, '& .MuiChip-label': { px: 3 } }}
              />
              {subCategories.filter(sc => !sc.category || sc.category.id === activeCategory).map(sc => (
                <Chip 
                  key={sc.id} 
                  label={sc.name} 
                  color={activeSubCategory === sc.id ? 'secondary' : 'default'} 
                  onClick={() => setActiveSubCategory(sc.id)}
                  sx={{ fontSize: '1.1rem', height: 48, '& .MuiChip-label': { px: 3 } }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </Container>
      <Container sx={{ py: 3 }}>
        <Grid container spacing={4}>
          {items.map((it) => (
            <Grid item key={it.id} xs={12} sm={6} md={4} lg={3}>
              <Card variant="outlined" sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                transition: 'transform .2s ease-in-out', 
                cursor: 'pointer',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
                } 
              }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 2, minHeight: 'auto' }}>
                    {it.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, minHeight: 60, lineHeight: 1.5 }}>
                    {it.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip 
                      label={`Цена: ${it.basePrice} ₸`} 
                      color="secondary" 
                      variant="outlined" 
                      sx={{ fontSize: '1.1rem', height: 44, '& .MuiChip-label': { px: 2 } }}
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    onClick={() => addToCart(it)}
                    size="large"
                    sx={{ py: 2, fontSize: '1.2rem', fontWeight: 600 }}
                  >
                    Добавить в корзину
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {cart.length > 0 && (
          <Box sx={{ mt: 6, p: 4, bgcolor: 'background.paper', borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
              Корзина (конфигурация)
            </Typography>
            {cart.map((line, idx) => {
              const item = items.find((i) => i.id === line.menuItemId);
              if (!item) return null;
              return (
                <Card key={idx} variant="outlined" sx={{ mb: 3, p: 3 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                      {item.modifiers.map((m) => (
                        <Chip
                          key={m.id}
                          label={`${m.name} (+${m.additionalPrice} ₸)`}
                          color={line.modifiersId.includes(m.id) ? 'primary' : 'default'}
                          onClick={() => toggleModifier(line, m.id)}
                          sx={{ fontSize: '1rem', height: 44, '& .MuiChip-label': { px: 2 } }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, minWidth: 120 }}>
                        Количество:
                      </Typography>
                      <IconButton 
                        color="primary" 
                        aria-label="decrement" 
                        onClick={() => decrementLine(idx)}
                        sx={{ p: 2 }}
                      >
                        <RemoveIcon sx={{ fontSize: '2rem' }} />
                      </IconButton>
                      <TextField
                        size="medium"
                        type="number"
                        inputProps={{ min: 1, style: { fontSize: '1.2rem', textAlign: 'center' } }}
                        value={line.quantity}
                        onChange={(e) => {
                          const value = Math.max(0, Number(e.target.value) || 0);
                          if (value <= 0) {
                            setCart(cart.filter((_, i) => i !== idx));
                          } else {
                            line.quantity = value;
                            setCart([...cart]);
                          }
                        }}
                        sx={{ width: 120, '& .MuiInputBase-root': { height: 56 } }}
                      />
                      <IconButton 
                        color="primary" 
                        aria-label="increment" 
                        onClick={() => incrementLine(idx)}
                        sx={{ p: 2 }}
                      >
                        <AddIcon sx={{ fontSize: '2rem' }} />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
            <Button 
              size="large" 
              variant="contained" 
              onClick={() => nav('/cart', { state: { cart } })}
              sx={{ mt: 3, py: 3, px: 6, fontSize: '1.3rem', fontWeight: 700 }}
            >
              Оформить заказ
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}


