import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Badge, Box, Divider, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DiningIcon from '@mui/icons-material/Dining';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SideNav({ title = 'Cash System', cartCount = 0 }: { title?: string; cartCount?: number }) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  function go(path: string) {
    setOpen(false);
    nav(path);
  }

  return (
    <>
      <AppBar position="static" color="transparent" square sx={{
        background: 'linear-gradient(90deg, rgba(37,99,235,0.95) 0%, rgba(96,165,250,0.95) 100%)',
        backdropFilter: 'blur(8px)',
        borderRadius: 0,
        boxShadow: 'none',
        borderBottom: '1px solid rgba(2,6,23,0.08)'
      }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>{title}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={() => go('/cart')}>
            <Badge color="secondary" badgeContent={cartCount} overlap="circular">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { borderRadius: 0 } }}>
        <Box sx={{ width: 300, bgcolor: 'background.paper' }} role="presentation">
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 44, height: 44 }}>CS</Avatar>
            <Box>
              <Typography variant="h6" fontWeight={800}>Cash System</Typography>
              <Typography variant="body2" color="text.secondary">Ресторан • POS</Typography>
            </Box>
          </Box>
          <Divider />
          <List sx={{ py: 1 }}>
            <ListItemButton onClick={() => go('/orders')} sx={{ py: 2, px: 3, '&:hover': { bgcolor: 'rgba(37,99,235,0.08)' } }}>
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}><ReceiptLongIcon /></ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: 16, fontWeight: 700 }} primary="Заказы" />
            </ListItemButton>
            <ListItemButton onClick={() => go('/menu')} sx={{ py: 2, px: 3, '&:hover': { bgcolor: 'rgba(37,99,235,0.08)' } }}>
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}><RestaurantMenuIcon /></ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: 16, fontWeight: 700 }} primary="Меню" />
            </ListItemButton>
            <ListItemButton onClick={() => go('/order-mode')} sx={{ py: 2, px: 3, '&:hover': { bgcolor: 'rgba(37,99,235,0.08)' } }}>
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}><DiningIcon /></ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: 16, fontWeight: 700 }} primary="Режим" />
            </ListItemButton>
            <ListItemButton onClick={() => go('/cart')} sx={{ py: 2, px: 3, '&:hover': { bgcolor: 'rgba(37,99,235,0.08)' } }}>
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}><ShoppingCartIcon /></ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: 16, fontWeight: 700 }} primary="Корзина" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}


