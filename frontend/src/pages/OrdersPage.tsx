import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Chip, Box, Button } from '@mui/material';
import NavBar from '../components/NavBar';
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

  useEffect(() => {
    (async () => {
      const data = await OrderAPI.listOrders();
      setOrders(data);
    })();
  }, []);

  return (
    <Box>
      <NavBar title="Заказы" onOrdersClick={() => nav('/orders')} onMenuClick={() => nav('/menu')} onOrderModeClick={() => nav('/order-mode')} onCartClick={() => nav('/cart')} />
      <Container sx={{ py: 3 }}>
        <Grid container spacing={2}>
          {orders.map(o => (
            <Grid key={o.id} item xs={12} md={6} lg={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Заказ #{o.id}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                    <Chip label={`Статус: ${o.status}`} />
                    {o.table?.id && <Chip label={`Стол: ${o.table.id}`} />}
                    {o.customerId && <Chip label={`Клиент: ${o.customerId}`} />}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {orders.length === 0 && <Typography>Пока нет заказов</Typography>}
      </Container>
    </Box>
  );
}


