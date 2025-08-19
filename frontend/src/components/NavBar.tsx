import { AppBar, Badge, Box, Button, Toolbar, Typography } from '@mui/material';

export default function NavBar({
  title = 'Cash System',
  cartCount = 0,
  onMenuClick,
  onCartClick,
  onOrderModeClick,
}: {
  title?: string;
  cartCount?: number;
  onMenuClick?: () => void;
  onCartClick?: () => void;
  onOrderModeClick?: () => void;
}) {
  return (
    <AppBar position="static" sx={{
      background: 'linear-gradient(90deg, #1a73e8 0%, #6a11cb 100%)'
    }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={onMenuClick}>Меню</Button>
        <Button color="inherit" onClick={onOrderModeClick}>Режим</Button>
        <Button color="inherit" onClick={onCartClick}>
          <Badge color="secondary" badgeContent={cartCount} overlap="circular">
            Корзина
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  );
}


