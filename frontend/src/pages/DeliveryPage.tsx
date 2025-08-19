import { Box, Button, Container, Stack, TextField, Typography, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SideNav from '../components/SideNav';
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
      <SideNav title="Доставка" />
      <Container sx={{ py: 4, maxWidth: 800 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => nav(-1)} sx={{ mb: 4, fontSize: '1.2rem', py: 2, px: 3 }}>
          Назад
        </Button>
        
        <Paper elevation={0} sx={{ 
          p: 6, 
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'primary.light',
          mb: 4
        }}>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
              Доставка
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 500, lineHeight: 1.6 }}>
              Укажите данные для доставки заказа
            </Typography>
          </Stack>
        </Paper>

        <Paper elevation={2} sx={{ p: 5 }}>
          <Stack spacing={4}>
            <TextField
              label="Имя"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              fullWidth
              size="large"
              sx={{ '& .MuiInputBase-root': { height: 64, fontSize: '1.1rem' } }}
            />
            
            <TextField
              label="Телефон"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              fullWidth
              size="large"
              sx={{ '& .MuiInputBase-root': { height: 64, fontSize: '1.1rem' } }}
            />
            
            <TextField
              label="Адрес доставки"
              value={deliveryNote}
              onChange={(e) => setDeliveryNote(e.target.value)}
              fullWidth
              multiline
              rows={3}
              size="large"
              sx={{ '& .MuiInputBase-root': { fontSize: '1.1rem' } }}
            />
            
            <Button
              variant="contained"
              onClick={proceed}
              size="large"
              disabled={!customerName || !customerPhone}
              sx={{ 
                py: 3, 
                px: 6, 
                fontSize: '1.3rem', 
                fontWeight: 700,
                height: 72
              }}
            >
              Перейти к меню
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}


