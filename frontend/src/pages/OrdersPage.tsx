import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Chip, Box, Button, IconButton, Paper, CircularProgress, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SideNav from '../components/SideNav';
import { OrderAPI } from '../api/http';
import { useNavigate } from 'react-router-dom';

type Order = {
  id: number;
  status: string;
  customerId?: number | null;
  table?: { id: number } | null;
  createdAt?: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await OrderAPI.listOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Ожидается';
      case 'in_progress':
        return 'В процессе';
      case 'completed':
        return 'Завершен';
      case 'cancelled':
        return 'Отменен';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in_progress':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'dine_in':
        return 'Официрование';
      case 'take_away':
        return 'Самовывоз';
      case 'delivery':
        return 'Доставка';
      default:
        return type;
    }
  };

  return (
    <Box>
      <SideNav title="Заказы" />
      <Container sx={{ py: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => nav(-1)} sx={{ mb: 4, fontSize: '1.2rem', py: 2, px: 3 }}>
          Назад
        </Button>
        
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
          Заказы
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={80} />
          </Box>
        ) : orders.length === 0 ? (
          <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'text.secondary' }}>
              Заказов пока нет
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => nav('/menu')}
              size="large"
              sx={{ py: 2, px: 4, fontSize: '1.2rem' }}
            >
              Сделать заказ
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {orders.map((order: any) => (
              <Grid item key={order.id} xs={12} md={6} lg={4}>
                <Card variant="outlined" sx={{ p: 4, height: '100%' }}>
                  <CardContent sx={{ p: 0 }}>
                    <Stack spacing={3}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          Заказ #{order.id}
                        </Typography>
                        <Chip
                          label={getStatusLabel(order.status)}
                          color={getStatusColor(order.status)}
                          sx={{ 
                            fontSize: '1rem', 
                            height: 40, 
                            fontWeight: 600,
                            '& .MuiChip-label': { px: 2 }
                          }}
                        />
                      </Box>
                      
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          Детали заказа:
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <strong>Тип:</strong> {getTypeLabel(order.type)}
                        </Typography>
                        {order.tableId && (
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Столик:</strong> {order.tableId}
                          </Typography>
                        )}
                        {order.customer && (
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Клиент:</strong> {order.customer.name}
                          </Typography>
                        )}
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <strong>Позиций:</strong> {order.items?.length || 0}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          {order.totalPrice || 0} ₸
                        </Typography>
                        <Button
                          variant="outlined"
                          size="large"
                          onClick={() => {/* View order details */}}
                          sx={{ py: 1.5, px: 3, fontSize: '1rem' }}
                        >
                          Подробнее
                        </Button>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}


