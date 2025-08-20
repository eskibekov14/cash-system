import { useLocation, useNavigate } from 'react-router-dom';
import { OrderAPI, MenuAPI, http, MenuItem } from '../api/http';
import { Typography, Container, Card, CardContent, Button, Box, Chip, Paper, Grid, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SideNav from '../components/SideNav';
import { useOrderCtx } from '../state/OrderContext';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const nav = useNavigate();
  const { mode, tableId, deliveryNote, customerName, customerPhone } = useOrderCtx();

  const [items, setItems] = useState<MenuItem[]>([]);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await MenuAPI.listItems();
      setItems(fetchedItems);
    };
    fetchItems();
  }, []);

  const totalItems = cart.reduce((sum: number, line: any) => sum + line.quantity, 0);
  const totalPrice = cart.reduce((sum: number, line: any) => {
    const item = items.find((i) => i.id === line.menuItemId);
    if (!item) return sum;
    const itemPrice = item.modifiers.reduce((itemSum: number, modifier: any) => itemSum + modifier.additionalPrice, item.basePrice);
    return sum + itemPrice * line.quantity;
  }, 0);

  async function handlePlaceOrder() {
    setPlacing(true);
    try {
      console.log('Attempting to place order with mode:', mode);
      console.log('Cart items:', cart);
      console.log('Auth token:', localStorage.getItem('token'));
      
      if (mode === 'TAKEAWAY') {
        console.log('Creating takeaway order...');
        await OrderAPI.createTakeaway(cart);
      } else if (mode === 'DINE_IN') {
        console.log('Creating dine-in order...');
        await http.post('/order/order', { customer: null, tableId, items: cart });
      } else if (mode === 'DELIVERY') {
        console.log('Creating delivery order...');
        await http.post('/order/order/delivery', {
          customer: { name: customerName || 'Гость', phone: customerPhone || '', address: deliveryNote || undefined },
          tableId: null,
          items: cart,
        });
      }
      console.log('Order placed successfully!');
      nav('/orders');
    } catch (error: any) {
      console.error('Error placing order:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      alert(`Ошибка при оформлении заказа: ${error.response?.data?.message || error.message}`);
    } finally {
      setPlacing(false);
    }
  }

  return (
    <Box>
      <SideNav title="Оформление заказа" cartCount={cart.length} />
      <Container sx={{ py: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => nav(-1)} sx={{ mb: 4, fontSize: '1.2rem', py: 2, px: 3 }}>
          Назад
        </Button>
        
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
          Корзина
        </Typography>
        
        {cart.length === 0 ? (
          <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'text.secondary' }}>
              Корзина пуста
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => nav('/menu')}
              size="large"
              sx={{ py: 2, px: 4, fontSize: '1.2rem' }}
            >
              Перейти к меню
            </Button>
          </Paper>
        ) : (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Товары в заказе
                </Typography>
                {cart.map((line: any, idx: number) => {
                  const item = items.find((i) => i.id === line.menuItemId);
                  if (!item) return null;
                  return (
                    <Card key={idx} variant="outlined" sx={{ mb: 3, p: 3 }}>
                      <CardContent sx={{ p: 0 }}>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs={12} sm={6}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                              {item.name}
                              </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              {item.modifiers.map((m: any) => (
                                <Chip
                                  key={m.id}
                                  label={`${m.name} (+${m.additionalPrice} ₸)`}
                                  color={line.modifiersId.includes(m.id) ? 'primary' : 'default'}
                                  variant="outlined"
                                  size="small"
                                  sx={{ fontSize: '0.9rem', height: 32 }}
                                />
                              ))}
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                              {item.basePrice} ₸
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                              x{line.quantity}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  );
                })}
              </Grid>
            </Grid>
            
            {/* Блок ИТОГО внизу */}
            <Box sx={{ mt: 6 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'primary.light',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                maxWidth: 600
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: 'primary.main', textAlign: 'center' }}>
                Итого
              </Typography>
              
              <Stack spacing={3} sx={{ mb: 4 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Товары:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {totalItems} шт.
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Сумма:</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {totalPrice} ₸
                  </Typography>
                </Box>
              </Stack>
              
              <Button
                variant="contained"
                onClick={handlePlaceOrder}
                fullWidth
                size="large"
                disabled={placing}
                sx={{ 
                  py: 3, 
                  fontSize: '1.3rem', 
                  fontWeight: 700,
                  height: 72,
                  borderRadius: 3,
                  boxShadow: '0 8px 16px rgba(33, 150, 243, 0.3)',
                  '&:hover': {
                    boxShadow: '0 12px 24px rgba(33, 150, 243, 0.4)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {placing ? 'Оформляем...' : 'Оформить заказ'}
              </Button>
            </Paper>
          </Box>
          </>
        )}
      </Container>
    </Box>
  );
}


