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
  
  const handleModeSelect = (mode: 'TAKEAWAY' | 'DINE_IN' | 'DELIVERY') => {
    setMode(mode);
    if (mode === 'DINE_IN') {
      nav('/order-mode/dine-in');
    } else if (mode === 'DELIVERY') {
      nav('/order-mode/delivery');
    } else {
      nav('/menu');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <SideNav title="Тип заказа" />
      <Container sx={{ py: 6, pt: 8 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => nav(-1)} 
          sx={{ 
            mb: 6, 
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
        
        {/* Hero Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 8, 
            mb: 8, 
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            borderRadius: 6,
            border: '1px solid rgba(99, 102, 241, 0.2)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236366f1" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.5,
            }
          }}
        >
          <Stack spacing={4} alignItems="center">
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800, 
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                zIndex: 1,
              }}
            >
              Выберите тип заказа
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'text.secondary', 
                maxWidth: 600, 
                lineHeight: 1.6,
                fontWeight: 500,
                position: 'relative',
                zIndex: 1,
              }}
            >
              Выберите удобный для вас способ получения заказа
            </Typography>
          </Stack>
        </Paper>

        {/* Order Mode Cards */}
        <Grid container spacing={4}>
          {/* Dine In */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: 400, 
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': { 
                  transform: 'translateY(-16px)',
                  boxShadow: '0 25px 60px rgba(99, 102, 241, 0.15)',
                  '& .mode-icon': {
                    transform: 'scale(1.1) rotate(5deg)',
                  }
                }
              }}
              onClick={() => handleModeSelect('DINE_IN')}
            >
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
                p: 5
              }}>
                <Box
                  className="mode-icon"
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 4,
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 12px 40px rgba(99, 102, 241, 0.3)',
                  }}
                >
                  <DiningIcon sx={{ fontSize: 60, color: 'white' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                  В ресторане
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  Забронируйте столик и насладитесь атмосферой нашего ресторана
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Takeaway */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: 400, 
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': { 
                  transform: 'translateY(-16px)',
                  boxShadow: '0 25px 60px rgba(245, 158, 11, 0.15)',
                  '& .mode-icon': {
                    transform: 'scale(1.1) rotate(-5deg)',
                  }
                }
              }}
              onClick={() => handleModeSelect('TAKEAWAY')}
            >
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
                p: 5
              }}>
                <Box
                  className="mode-icon"
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 4,
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 12px 40px rgba(245, 158, 11, 0.3)',
                  }}
                >
                  <ShoppingBagIcon sx={{ fontSize: 60, color: 'white' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                  На вынос
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  Заберите заказ в удобное время и насладитесь дома
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Delivery */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: 400, 
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': { 
                  transform: 'translateY(-16px)',
                  boxShadow: '0 25px 60px rgba(16, 185, 129, 0.15)',
                  '& .mode-icon': {
                    transform: 'scale(1.1) rotate(5deg)',
                  }
                }
              }}
              onClick={() => handleModeSelect('DELIVERY')}
            >
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
                p: 5
              }}>
                <Box
                  className="mode-icon"
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 4,
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 12px 40px rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <DeliveryDiningIcon sx={{ fontSize: 60, color: 'white' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                  Доставка
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  Заказ будет доставлен прямо к вашей двери в кратчайшие сроки
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}


