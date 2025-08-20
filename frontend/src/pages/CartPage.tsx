import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrderCtx } from '../state/OrderContext';
import { OrderAPI } from '../api/http';
import { http } from '../api/http';
import { 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Button, 
  Box, 
  IconButton, 
  Stack, 
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Alert,
  Fade,
  Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SideNav from '../components/SideNav';

type CartLine = { menuItemId: number; modifiersId: number[]; quantity: number };

export default function CartPage() {
  const { mode, setMode, tableId, setTableId } = useOrderCtx();
  const nav = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState<CartLine[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [placing, setPlacing] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');

  useEffect(() => {
    if (location.state?.cart) {
      setCart(location.state.cart);
    }
    // Здесь нужно загрузить информацию о блюдах по их ID
    // Для демонстрации используем заглушку
  }, [location.state]);

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

  const totalItems = cart.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <SideNav title="Корзина" cartCount={totalItems} />
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

        {/* Order Mode Display */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: 4,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
            Режим заказа: {mode === 'TAKEAWAY' ? 'На вынос' : mode === 'DINE_IN' ? 'В ресторане' : 'Доставка'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {mode === 'TAKEAWAY' && 'Заберите заказ в удобное время'}
            {mode === 'DINE_IN' && 'Насладитесь блюдами в уютной атмосфере ресторана'}
            {mode === 'DELIVERY' && 'Заказ будет доставлен прямо к вашей двери'}
          </Typography>
        </Paper>

        {/* Customer Information for Delivery */}
        {mode === 'DELIVERY' && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              mb: 4, 
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 4,
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: 'text.primary' }}>
              Информация для доставки
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Имя"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Телефон"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Адрес доставки"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  variant="outlined"
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Cart Items */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 4,
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'text.primary' }}>
            Ваш заказ ({totalItems} товаров)
          </Typography>
          
          {cart.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Корзина пуста
              </Typography>
              <Button
                variant="contained"
                onClick={() => nav('/menu')}
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  }
                }}
              >
                Перейти к меню
              </Button>
            </Box>
          ) : (
            <Stack spacing={3}>
              {cart.map((line, idx) => (
                <Card 
                  key={idx} 
                  sx={{ 
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    borderRadius: 3,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: 'rgba(99, 102, 241, 0.3)',
                      boxShadow: '0 8px 25px rgba(99, 102, 241, 0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                          Блюдо #{line.menuItemId}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Количество: {line.quantity}
                        </Typography>
                        {line.modifiersId.length > 0 && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              Модификаторы:
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                              {line.modifiersId.map((modId) => (
                                <Chip
                                  key={modId}
                                  label={`Модификатор #${modId}`}
                                  size="small"
                                  sx={{
                                    background: 'rgba(99, 102, 241, 0.1)',
                                    color: 'primary.main',
                                    fontWeight: 500,
                                  }}
                                />
                              ))}
                            </Stack>
                          </Box>
                        )}
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                          onClick={() => {
                            const newCart = [...cart];
                            if (newCart[idx].quantity > 1) {
                              newCart[idx].quantity -= 1;
                            } else {
                              newCart.splice(idx, 1);
                            }
                            setCart(newCart);
                          }}
                          sx={{ 
                            background: 'rgba(239, 68, 68, 0.1)',
                            '&:hover': { background: 'rgba(239, 68, 68, 0.2)' }
                          }}
                        >
                          <RemoveIcon sx={{ color: 'error.main' }} />
                        </IconButton>
                        
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', minWidth: 40, textAlign: 'center' }}>
                          {line.quantity}
                        </Typography>
                        
                        <IconButton
                          onClick={() => {
                            const newCart = [...cart];
                            newCart[idx].quantity += 1;
                            setCart(newCart);
                          }}
                          sx={{ 
                            background: 'rgba(16, 185, 129, 0.1)',
                            '&:hover': { background: 'rgba(16, 185, 129, 0.2)' }
                          }}
                        >
                          <AddIcon sx={{ color: 'success.main' }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Paper>

        {/* Order Summary */}
        {cart.length > 0 && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: 4,
            }}
          >
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'success.main', textAlign: 'center' }}>
              Готово к оформлению!
            </Typography>
            
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handlePlaceOrder}
                disabled={placing}
                sx={{
                  py: 3,
                  px: 8,
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: 3,
                  boxShadow: '0 12px 35px rgba(16, 185, 129, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    boxShadow: '0 16px 45px rgba(16, 185, 129, 0.4)',
                    transform: 'translateY(-2px)'
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #a7f3d0 0%, #86efac 100%)',
                    transform: 'none',
                  }
                }}
              >
                {placing ? 'Оформляем заказ...' : 'Оформить заказ'}
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
}


