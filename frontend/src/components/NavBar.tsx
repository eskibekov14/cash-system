import { AppBar, Badge, Box, Button, Toolbar, Typography } from '@mui/material';

export default function NavBar({
  title = 'Cash System',
  cartCount = 0,
  onMenuClick,
  onCartClick,
  onOrderModeClick,
  onOrdersClick,
}: {
  title?: string;
  cartCount?: number;
  onMenuClick?: () => void;
  onCartClick?: () => void;
  onOrderModeClick?: () => void;
  onOrdersClick?: () => void;
}) {
  return (
    <AppBar position="static" color="transparent" sx={{
      background: 'linear-gradient(90deg, rgba(123,30,30,0.95) 0%, rgba(200,169,106,0.95) 100%)',
      backdropFilter: 'blur(6px)'
    }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" variant="text" onClick={onOrdersClick}>Заказы</Button>
        <Button color="inherit" variant="text" onClick={onMenuClick}>Меню</Button>
        <Button color="inherit" variant="text" onClick={onOrderModeClick}>Режим</Button>
        <Button color="inherit" variant="outlined" sx={{ ml: 1, borderColor: 'rgba(255,255,255,0.7)' }} onClick={onCartClick}>
          <Badge color="secondary" badgeContent={cartCount} overlap="circular">
            Корзина
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  );
}


