import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '../api/http';
import { useAuthCtx } from '../state/AuthContext';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';

export default function LoginPage() {
  const { setToken } = useAuthCtx();
  const nav = useNavigate();
  const [username, setUsername] = useState('testuser');
  const [password, setPassword] = useState('testpass123');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      console.log('Attempting login with:', { username, password });
      const jwt = await AuthAPI.login(username, password);
      console.log('Login successful, JWT received');
      setToken(jwt);
      nav('/order-mode');
    } catch (err) {
      console.error('Login error:', err);
      setError('Ошибка входа');
    }
  }

  return (
    <Container maxWidth="sm" sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
        <Typography variant="h5" gutterBottom>Вход</Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Логин" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
          <TextField label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" type="submit">Войти</Button>
        </Box>
      </Paper>
    </Container>
  );
}


