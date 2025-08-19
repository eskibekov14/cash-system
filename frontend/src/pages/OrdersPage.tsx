import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Chip, Box, Button, IconButton, Paper, CircularProgress, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
  totalPrice?: number;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await OrderAPI.listOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    setUpdatingOrderId(orderId);
    try {
      await OrderAPI.updateOrderStatus(orderId, newStatus as any);
      // Обновляем локальное состояние
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      setStatusDialogOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert('Ошибка при обновлении статуса заказа');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const openStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setStatusDialogOpen(true);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'Новый';
      case 'IN_PROGRESS':
        return 'В процессе';
      case 'COMPLETED':
        return 'Готов';
      case 'CANCELLED':
        return 'Отменен';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'warning';
      case 'IN_PROGRESS':
        return 'info';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
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

  const getNextStatusOptions = (currentStatus: string) => {
    switch (currentStatus) {
      case 'OPEN':
        return [
          { value: 'IN_PROGRESS', label: 'Взять в работу', color: 'info' },
          { value: 'CANCELLED', label: 'Отменить', color: 'error' }
        ];
      case 'IN_PROGRESS':
        return [
          { value: 'COMPLETED', label: 'Завершить', color: 'success' },
          { value: 'CANCELLED', label: 'Отменить', color: 'error' }
        ];
      case 'COMPLETED':
        return []; // Завершенный заказ нельзя изменить
      case 'CANCELLED':
        return []; // Отмененный заказ нельзя изменить
      default:
        return [];
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
                          onClick={() => openStatusDialog(order)}
                          sx={{ py: 1.5, px: 3, fontSize: '1rem' }}
                        >
                          Изменить статус
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

      {/* Диалог изменения статуса */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Изменить статус заказа #{selectedOrder?.id}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Текущий статус: <strong>{selectedOrder ? getStatusLabel(selectedOrder.status) : ''}</strong>
          </Typography>
          <Stack spacing={2}>
            {selectedOrder && getNextStatusOptions(selectedOrder.status).map((option) => (
              <Button
                key={option.value}
                variant="contained"
                color={option.color as any}
                onClick={() => handleStatusUpdate(selectedOrder.id, option.value)}
                disabled={updatingOrderId === selectedOrder.id}
                sx={{ py: 2, fontSize: '1.1rem' }}
              >
                {updatingOrderId === selectedOrder.id ? 'Обновляем...' : option.label}
              </Button>
            ))}
            {selectedOrder && getNextStatusOptions(selectedOrder.status).length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                Статус этого заказа нельзя изменить
              </Typography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


