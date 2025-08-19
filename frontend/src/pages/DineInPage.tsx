import { Box, Button, Container, Grid, Paper, Stack, Typography, CircularProgress, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SideNav from '../components/SideNav';
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

  function handleTableSelect(tableId: number) {
    handleSelect(tableId);
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case 'AVAILABLE':
        return 'Свободен';
      case 'OCCUPIED':
        return 'Занят';
      case 'RESERVED':
        return 'Забронирован';
      default:
        return '';
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'AVAILABLE':
        return 'success';
      case 'OCCUPIED':
        return 'error';
      case 'RESERVED':
        return 'info';
      default:
        return 'default';
    }
  }

  return (
    <Box>
      <SideNav title="Выбор столика" />
      <Container sx={{ py: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => nav(-1)} sx={{ mb: 4, fontSize: '1.2rem', py: 2, px: 3 }}>
          Назад
        </Button>
        
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: 'primary.main', textAlign: 'center' }}>
          Выберите столик
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={80} />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {tables.map((table) => (
              <Grid item key={table.id} xs={12} sm={6} md={4} lg={3}>
                <Paper
                  elevation={table.status === 'AVAILABLE' ? 4 : 2}
                  sx={{
                    p: 4,
                    height: 200,
                    cursor: table.status === 'AVAILABLE' ? 'pointer' : 'default',
                    transition: 'all 0.3s ease-in-out',
                    border: '2px solid',
                    borderColor: table.status === 'AVAILABLE' ? 'primary.main' : 'grey.300',
                    bgcolor: table.status === 'AVAILABLE' ? 'background.paper' : 'grey.100',
                    '&:hover': table.status === 'AVAILABLE' ? {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 32px rgba(33, 150, 243, 0.2)',
                      borderColor: 'primary.dark'
                    } : {},
                  }}
                  onClick={() => table.status === 'AVAILABLE' && handleTableSelect(table.id)}
                >
                  <Stack spacing={3} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                    <Box sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: table.status === 'AVAILABLE' ? 'primary.main' : 'grey.400',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 700
                    }}>
                      {table.name}
                    </Box>
                    
                    <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center' }}>
                      Столик {table.name}
                    </Typography>
                    
                    <Stack spacing={1} alignItems="center">
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Вместимость: {table.capacity} чел.
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {table.location}
                      </Typography>
                    </Stack>
                    
                    <Chip
                      label={getStatusLabel(table.status)}
                      color={getStatusColor(table.status)}
                      sx={{ 
                        fontSize: '1rem', 
                        height: 40, 
                        fontWeight: 600,
                        '& .MuiChip-label': { px: 2 }
                      }}
                    />
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}


