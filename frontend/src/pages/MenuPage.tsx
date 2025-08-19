import { useEffect, useState } from 'react';
import { MenuAPI, MenuItem } from '../api/http';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardContent, Button, Chip, Box, TextField, CardActions, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
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
                      <IconButton color="primary" aria-label="decrement" onClick={() => decrementLine(idx)}>
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        size="small"
                        type="number"
                        inputProps={{ min: 1 }}
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
                        sx={{ width: 80 }}
                      />
                      <IconButton color="primary" aria-label="increment" onClick={() => incrementLine(idx)}>
                        <AddIcon />
                      </IconButton>
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


