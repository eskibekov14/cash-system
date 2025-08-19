import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import { useOrderCtx } from '../state/OrderContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function DeliveryPage() {
  const { setMode, deliveryNote, setDeliveryNote, customerName, setCustomerName, customerPhone, setCustomerPhone } = useOrderCtx();
  const nav = useNavigate();

  function proceed() {
    setMode('DELIVERY');
    nav('/menu');
  }

  return (
    <Box>
      <NavBar title="Доставка" cartCount={0} onOrdersClick={() => nav('/orders')} onMenuClick={() => nav('/menu')} onOrderModeClick={() => nav('/order-mode')} onCartClick={() => nav('/cart')} />
      <Container sx={{ py: 4, maxWidth: 640 }}>
        <Typography variant="h5" gutterBottom>Данные доставки</Typography>
        <Stack spacing={2}>
          <TextField label="Имя" value={customerName} onChange={(e) => setCustomerName(e.target.value)} fullWidth />
          <TextField label="Телефон" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} fullWidth />
          <TextField label="Адрес / комментарий" value={deliveryNote} onChange={(e) => setDeliveryNote(e.target.value)} fullWidth multiline minRows={3} />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={() => nav('/order-mode')}>Назад</Button>
          <Button variant="contained" onClick={proceed}>К меню</Button>
        </Stack>
      </Container>
    </Box>
  );
}


