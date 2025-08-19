import { Box, Button, Container, Grid, Paper, Stack, Typography, CircularProgress } from '@mui/material';
import NavBar from '../components/NavBar';
import { useOrderCtx } from '../state/OrderContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GuestTable, TableAPI } from '../api/http';

export default function DineInPage() {
  const { setMode, setTableId } = useOrderCtx();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tables, setTables] = useState<GuestTable[]>([]);

  useEffect(() => {
    TableAPI.listTables()
      .then((data) => setTables(data))
      .finally(() => setLoading(false));
  }, []);

  function handleSelect(tableId: number) {
    setMode('DINE_IN');
    setTableId(tableId);
    nav('/menu');
  }

  return (
    <Box>
      <NavBar title="Выбор столика" cartCount={0} onMenuClick={() => nav('/menu')} onOrderModeClick={() => nav('/order-mode')} onCartClick={() => nav('/cart')} />
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>Зал</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} columns={{ xs: 6, sm: 8, md: 12 }}>
            {tables.map((t) => (
              <Grid item xs={2} key={t.id}>
                <Paper
                  onClick={() => handleSelect(t.id)}
                  elevation={t.status === 'AVAILABLE' ? 1 : 4}
                  sx={{
                    cursor: 'pointer',
                    p: 2,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    bgcolor: t.status === 'OCCUPIED' ? 'error.light' : t.status === 'RESERVED' ? 'warning.light' : 'background.paper',
                  }}
                >
                  <Stack>
                    <Typography variant="subtitle1">{t.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t.status === 'AVAILABLE' ? 'Свободен' : t.status === 'OCCUPIED' ? 'Занят' : 'Забронирован'}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={() => nav('/order-mode')}>Назад</Button>
        </Box>
      </Container>
    </Box>
  );
}


