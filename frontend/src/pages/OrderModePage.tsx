import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, Typography, Stack } from '@mui/material';
import NavBar from '../components/NavBar';
import { useOrderCtx } from '../state/OrderContext';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function OrderModePage() {
  const { setMode, setTableId } = useOrderCtx();
  const nav = useNavigate();
  return (
    <Box>
      <NavBar title="Тип заказа" cartCount={0} onMenuClick={() => nav('/menu')} onOrderModeClick={() => {}} onCartClick={() => nav('/cart')} />
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: 240 }}>
              <CardActionArea sx={{ height: '100%' }} onClick={() => nav('/order-mode/dine-in')}>
                <CardContent sx={{ height: '100%' }}>
                  <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ height: '100%' }}>
                    <RestaurantIcon sx={{ fontSize: 72 }} color="primary" />
                    <Typography variant="h5" align="center">В зале</Typography>
                    <Typography variant="body2" color="text.secondary" align="center">Выбор столика на схеме</Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: 240 }}>
              <CardActionArea sx={{ height: '100%' }} onClick={() => { setMode('TAKEAWAY'); setTableId(null); nav('/menu'); }}>
                <CardContent sx={{ height: '100%' }}>
                  <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ height: '100%' }}>
                    <ShoppingBagIcon sx={{ fontSize: 72 }} color="primary" />
                    <Typography variant="h5" align="center">С собой</Typography>
                    <Typography variant="body2" color="text.secondary" align="center">Быстрый заказ на вынос</Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: 240 }}>
              <CardActionArea sx={{ height: '100%' }} onClick={() => nav('/order-mode/delivery')}>
                <CardContent sx={{ height: '100%' }}>
                  <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ height: '100%' }}>
                    <LocalShippingIcon sx={{ fontSize: 72 }} color="primary" />
                    <Typography variant="h5" align="center">Доставка</Typography>
                    <Typography variant="body2" color="text.secondary" align="center">Оформление с адресом</Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
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


