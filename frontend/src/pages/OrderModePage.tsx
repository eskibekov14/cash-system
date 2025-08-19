import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, Typography, Stack, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SideNav from '../components/SideNav';
import { useOrderCtx } from '../state/OrderContext';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DiningIcon from '@mui/icons-material/Dining';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

export default function OrderModePage() {
  const { setMode, setTableId } = useOrderCtx();
  const nav = useNavigate();
  return (
    <Box>
      <SideNav title="Тип заказа" />
      <Container sx={{ py: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => nav(-1)} sx={{ mb: 4, fontSize: '1.2rem', py: 2, px: 3 }}>
          Назад
        </Button>
        
        {/* Hero Section */}
        <Paper elevation={0} sx={{ 
          p: 6, 
          mb: 6, 
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'primary.light'
        }}>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
              Выберите тип заказа
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, lineHeight: 1.6 }}>
              Выберите удобный для вас способ получения заказа
            </Typography>
          </Stack>
        </Paper>

        {/* Order Mode Cards */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: 300, 
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': { 
                  transform: 'translateY(-12px)',
                  boxShadow: '0 20px 40px rgba(33, 150, 243, 0.15)'
                }
              }}
              onClick={() => nav('/order-mode/dine-in')}
            >
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
                p: 4
              }}>
                <DiningIcon sx={{ fontSize: '4rem', color: 'primary.main', mb: 3 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  В ресторане
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  Выберите столик и наслаждайтесь блюдами в уютной атмосфере
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: 300, 
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': { 
                  transform: 'translateY(-12px)',
                  boxShadow: '0 20px 40px rgba(33, 150, 243, 0.15)'
                }
              }}
              onClick={() => nav('/menu')}
            >
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
                p: 4
              }}>
                <ShoppingBagIcon sx={{ fontSize: '4rem', color: 'primary.main', mb: 3 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  На вынос
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  Заберите заказ в удобное время и наслаждайтесь дома
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: 300, 
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': { 
                  transform: 'translateY(-12px)',
                  boxShadow: '0 20px 40px rgba(33, 150, 243, 0.15)'
                }
              }}
              onClick={() => nav('/order-mode/delivery')}
            >
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
                p: 4
              }}>
                <DeliveryDiningIcon sx={{ fontSize: '4rem', color: 'primary.main', mb: 3 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  Доставка
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  Заказ будет доставлен по указанному адресу в кратчайшие сроки
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={() => nav('/menu')}>К меню</Button>
          <Button variant="contained" onClick={() => nav('/cart')}>Перейти к корзине</Button>
        </Box>
      </Container>
    </Box>
  );
}


