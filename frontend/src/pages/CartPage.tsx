import { useLocation, useNavigate } from 'react-router-dom';
import { OrderAPI, MenuAPI } from '../api/http';
import { Typography, Container, Card, CardContent, Button, Box, Chip } from '@mui/material';
import NavBar from '../components/NavBar';

export default function CartPage() {
  const nav = useNavigate();
  const { state } = useLocation() as { state: { cart: { menuItemId: number; modifiersId: number[]; quantity: number }[] } };
  const cart = state?.cart ?? [];

  async function placeOrder() {
    await OrderAPI.createTakeaway(cart);
    nav('/menu');
  }

  return (
    <Box>
      <NavBar title="Оформление заказа" cartCount={cart.length} onMenuClick={() => nav('/menu')} onCartClick={() => {}} />
      <Container sx={{ py: 3 }}>
        {cart.length === 0 ? (
          <Typography>Корзина пуста</Typography>
        ) : (
          <>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>Позиции</Typography>
                {cart.map((line, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Chip label={`ID: ${line.menuItemId}`} />
                    <Chip label={`Кол-во: ${line.quantity}`} />
                    <Chip label={`Модификаторы: ${line.modifiersId.join(', ') || 'нет'}`} />
                  </Box>
                ))}
              </CardContent>
            </Card>
            <Button variant="contained" onClick={placeOrder}>Отправить заказ</Button>
          </>
        )}
      </Container>
    </Box>
  );
}


