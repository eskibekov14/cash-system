import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Badge, Box, Divider, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DiningIcon from '@mui/icons-material/Dining';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function SideNav({ title, cartCount = 0 }: { title: string; cartCount?: number }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const menuItems = [
    { path: '/orders', icon: <ReceiptLongIcon />, text: 'Заказы' },
    { path: '/menu', icon: <RestaurantMenuIcon />, text: 'Меню' },
    { path: '/order-mode', icon: <DiningIcon />, text: 'Режим заказа' },
  ];

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen(true)}
              sx={{ 
                mr: 2,
                color: 'text.primary',
                '&:hover': {
                  background: 'rgba(99, 102, 241, 0.1)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {title}
            </Typography>
          </Box>

          <IconButton 
            color="inherit" 
            onClick={() => go('/cart')}
            sx={{ 
              color: 'text.primary',
              position: 'relative',
              '&:hover': {
                background: 'rgba(99, 102, 241, 0.1)',
              }
            }}
          >
            <Badge 
              badgeContent={cartCount} 
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                  fontWeight: 600,
                }
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '8px 0 32px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <Box sx={{ p: 3, pt: 8 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                margin: '0 auto 16px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
              }}
            >
              <RestaurantMenuIcon sx={{ fontSize: 32, color: 'white' }} />
            </Avatar>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Cash System
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Система управления заказами
            </Typography>
          </Box>

          <Divider sx={{ mb: 3, opacity: 0.3 }} />

          {/* Menu Items */}
          <List sx={{ '& .MuiListItemButton-root': { borderRadius: 2, mb: 1 } }}>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.path}
                onClick={() => go(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                    }
                  },
                  '&:hover': {
                    background: 'rgba(99, 102, 241, 0.05)',
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 40, 
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    '& .MuiSvgIcon-root': {
                      fontSize: 24,
                    }
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: location.pathname === item.path ? 600 : 500,
                      color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                    }
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          {/* Footer */}
          <Box sx={{ mt: 'auto', pt: 3, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Версия 1.0.0
            </Typography>
          </Box>
        </Box>
      </Drawer>

      <Toolbar />
    </>
  );
}


