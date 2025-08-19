import { useLocation, useNavigate } from 'react-router-dom';
import { OrderAPI, MenuAPI, http } from '../api/http';
import { Typography, Container, Card, CardContent, Button, Box, Chip } from '@mui/material';
import NavBar from '../components/NavBar';
import { useOrderCtx } from '../state/OrderContext';

export default function CartPage() {
  const nav = useNavigate();
  const { state } = useLocation() as { state: { cart: { menuItemId: number; modifiersId: number[]; quantity: number }[] } };
  const cart = state?.cart ?? [];
  const { mode, tableId, deliveryNote, customerName, customerPhone } = useOrderCtx();

  async function placeOrder() {
    if (mode === 'TAKEAWAY') {
      await OrderAPI.createTakeaway(cart);
    } else if (mode === 'DINE_IN') {
      await http.post('/order/order', { customer: null, tableId, items: cart });
    } else if (mode === 'DELIVERY') {
      await http.post('/order/order/delivery', {
        customer: { name: customerName || 'Гость', phone: customerPhone || '', address: deliveryNote || undefined },
        tableId: null,
        items: cart,
      });
    }
    nav('/orders');
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


