import { useEffect, useState } from 'react';
import { MenuAPI, MenuItem, CategoryAPI, Category, SubCategory } from '../api/http';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardContent, Button, Chip, Box, TextField, CardActions, IconButton, Stack, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import RestaurantIcon from '@mui/icons-material/Restaurant';
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
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <SideNav title="Меню" cartCount={cart.length} />
      <Container sx={{ py: 4, pt: 8 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => nav(-1)} 
          sx={{ 
            mb: 4, 
            fontSize: '1.1rem', 
            py: 2, 
            px: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.9)',
              transform: 'translateY(-2px)',
            }
          }}
        >
          Назад
        </Button>
        
        {/* Category Filters */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 4,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: 'text.primary' }}>
            Выберите категорию
          </Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
            <Chip 
              label="Все категории" 
              color={!activeCategory ? 'primary' : 'default'} 
              onClick={() => { setActiveCategory(null); setActiveSubCategory(null); }}
              sx={{ 
                fontSize: '1rem', 
                height: 48, 
                '& .MuiChip-label': { px: 3 },
                '&.MuiChip-colorPrimary': {
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                }
              }}
            />
            {categories.map(c => (
              <Chip 
                key={c.id} 
                label={c.name} 
                color={activeCategory === c.id ? 'primary' : 'default'} 
                onClick={() => { setActiveCategory(c.id); setActiveSubCategory(null); }}
                sx={{ 
                  fontSize: '1rem', 
                  height: 48, 
                  '& .MuiChip-label': { px: 3 },
                  '&.MuiChip-colorPrimary': {
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  }
                }}
              />
            ))}
          </Stack>
        </Paper>

        {/* Subcategory Filters */}
        {activeCategory && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              mb: 4, 
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 4,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
              Подкатегория
            </Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
              <Chip 
                label="Все подкатегории" 
                color={!activeSubCategory ? 'secondary' : 'default'} 
                onClick={() => setActiveSubCategory(null)}
                sx={{ 
                  fontSize: '1rem', 
                  height: 48, 
                  '& .MuiChip-label': { px: 3 },
                  '&.MuiChip-colorSecondary': {
                    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                  }
                }}
              />
              {subCategories.filter(sc => !sc.category || sc.category.id === activeCategory).map(sc => (
                <Chip 
                  key={sc.id}
                  label={sc.name} 
                  color={activeSubCategory === sc.id ? 'secondary' : 'default'} 
                  onClick={() => setActiveSubCategory(sc.id)}
                  sx={{ 
                    fontSize: '1rem', 
                    height: 48, 
                    '& .MuiChip-label': { px: 3 },
                    '&.MuiChip-colorSecondary': {
                      background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                    }
                  }}
                />
              ))}
            </Stack>
          </Paper>
        )}

        {/* Menu Items Grid */}
        <Grid container spacing={4}>
          {items.map((it) => (
            <Grid item xs={12} sm={6} md={4} key={it.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
                  }
                }}
              >
                {/* Image Section */}
                <Box sx={{ 
                  height: 200, 
                  position: 'relative',
                  background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderRadius: '20px 20px 0 0',
                }}>
                  {it.imageUrl ? (
                    <img 
                      src={it.imageUrl} 
                      alt={it.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback иконка */}
                  <Box sx={{ 
                    display: it.imageUrl ? 'none' : 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: 'text.secondary'
                  }}>
                    <RestaurantIcon sx={{ fontSize: '4rem', mb: 1 }} />
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                      Изображение отсутствует
                    </Typography>
                  </Box>
                </Box>
                
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 2, minHeight: 'auto', color: 'text.primary' }}>
                    {it.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, minHeight: 60, lineHeight: 1.5 }}>
                    {it.description}
                  </Typography>
                  
                  {/* Цена с улучшенным дизайном */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    mb: 2,
                    p: 2,
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    borderRadius: 2,
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                      Цена:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {it.basePrice} ₸
                    </Typography>
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    onClick={() => addToCart(it)}
                    size="large"
                    sx={{ 
                      py: 2, 
                      fontSize: '1.1rem', 
                      fontWeight: 600,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Добавить в корзину
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <Paper 
            elevation={0} 
            sx={{ 
              mt: 6, 
              p: 4, 
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 4,
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
              Корзина (конфигурация)
            </Typography>
            {cart.map((line, idx) => {
              const item = items.find((i) => i.id === line.menuItemId);
              if (!item) return null;
              return (
                <Box key={idx} sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  p: 3,
                  mb: 2,
                  background: 'rgba(99, 102, 241, 0.05)',
                  borderRadius: 3,
                  border: '1px solid rgba(99, 102, 241, 0.1)',
                }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Количество: {line.quantity}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                      onClick={() => decrementLine(idx)}
                      sx={{ 
                        background: 'rgba(239, 68, 68, 0.1)',
                        '&:hover': { background: 'rgba(239, 68, 68, 0.2)' }
                      }}
                    >
                      <RemoveIcon sx={{ fontSize: '1.5rem', color: 'error.main' }} />
                    </IconButton>
                    
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', minWidth: 40, textAlign: 'center' }}>
                      {line.quantity}
                    </Typography>
                    
                    <IconButton
                      onClick={() => incrementLine(idx)}
                      sx={{ 
                        background: 'rgba(16, 185, 129, 0.1)',
                        '&:hover': { background: 'rgba(16, 185, 129, 0.2)' }
                      }}
                    >
                      <AddIcon sx={{ fontSize: '1.5rem', color: 'success.main' }} />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
            
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => nav('/cart', { state: { cart } })}
                sx={{
                  py: 2,
                  px: 6,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: 3,
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    boxShadow: '0 12px 35px rgba(16, 185, 129, 0.4)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Перейти к корзине ({cart.length} товаров)
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
}


