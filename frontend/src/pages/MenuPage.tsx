import { useEffect, useState } from 'react';
import { MenuAPI, MenuItem } from '../api/http';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardContent, Button, Chip, Box, TextField, CardActions } from '@mui/material';
import NavBar from '../components/NavBar';

type CartLine = { menuItemId: number; modifiersId: number[]; quantity: number };

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    MenuAPI.listItems().then(setItems);
  }, []);

  function toggleModifier(line: CartLine, modId: number) {
    const has = line.modifiersId.includes(modId);
    line.modifiersId = has ? line.modifiersId.filter((m) => m !== modId) : [...line.modifiersId, modId];
    setCart([...cart]);
  }

  function addToCart(item: MenuItem) {
    setCart([...cart, { menuItemId: item.id, modifiersId: [], quantity: 1 }]);
  }

  return (
    <Box>
      <NavBar
        title="Меню"
        cartCount={cart.length}
        onOrdersClick={() => nav('/orders')}
        onMenuClick={() => nav('/menu')}
        onOrderModeClick={() => nav('/order-mode')}
        onCartClick={() => nav('/cart', { state: { cart } })}
      />
      <Container sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {items.map((it) => (
            <Grid item key={it.id} xs={12} sm={6} md={4} lg={3} xl={2.4 as any}>
              <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700}>{it.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ minHeight: 48 }}>{it.description}</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip label={`Цена: ${it.basePrice} ₸`} color="primary" variant="outlined" />
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button fullWidth variant="contained" onClick={() => addToCart(it)}>Добавить</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {cart.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Корзина (конфигурация)</Typography>
            {cart.map((line, idx) => {
              const item = items.find((i) => i.id === line.menuItemId);
              if (!item) return null;
              return (
                <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      {item.modifiers.map((m) => (
                        <Chip
                          key={m.id}
                          label={`${m.name} (+${m.additionalPrice} ₸)`}
                          color={line.modifiersId.includes(m.id) ? 'primary' : 'default'}
                          onClick={() => toggleModifier(line, m.id)}
                        />
                      ))}
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography>Кол-во:</Typography>
                      <TextField
                        size="small"
                        type="number"
                        inputProps={{ min: 1 }}
                        value={line.quantity}
                        onChange={(e) => {
                          line.quantity = Math.max(1, Number(e.target.value) || 1);
                          setCart([...cart]);
                        }}
                        sx={{ width: 100 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
            <Button size="large" variant="contained" onClick={() => nav('/cart', { state: { cart } })}>Оформить</Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}


