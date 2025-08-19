import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2196f3' }, // Blue
    secondary: { main: '#e3f2fd' }, // Light Blue
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2.5rem', // Larger for restaurant displays
    },
    h5: {
      fontWeight: 700,
      fontSize: '2rem', // Larger for restaurant displays
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.5rem', // Larger for restaurant displays
    },
    body1: {
      fontSize: '1.1rem', // Larger base text
    },
    body2: {
      fontSize: '1rem', // Larger secondary text
    },
  },
  shape: { borderRadius: 12 }, // Slightly more rounded for touch
  spacing: 2, // Increase base spacing unit
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontSize: '1.1rem', // Larger button text
          padding: '12px 24px', // Larger button padding
          minHeight: 56, // Larger touch target
        },
        sizeLarge: {
          fontSize: '1.3rem',
          padding: '16px 32px',
          minHeight: 64,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // More rounded for cards
          boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px', // Larger card padding
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '1rem', // Larger chip text
          height: 40, // Larger chip height
          '& .MuiChip-label': {
            padding: '0 16px', // Larger chip padding
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            fontSize: '1.1rem', // Larger input text
            minHeight: 56, // Larger input height
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 16, // Larger icon button padding
          '& .MuiSvgIcon-root': {
            fontSize: '1.5rem', // Larger icons
          },
        },
        sizeSmall: {
          padding: 12,
          '& .MuiSvgIcon-root': {
            fontSize: '1.3rem',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // No shadow for top bar
          borderBottom: '2px solid rgba(0, 0, 0, 0.12)', // Thicker bottom border
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 320, // Wider drawer for touch
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: '20px 24px', // Larger list item padding
          fontSize: '1.1rem', // Larger list item text
          minHeight: 64, // Larger touch target
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 48, // Larger icon spacing
          '& .MuiSvgIcon-root': {
            fontSize: '1.8rem', // Larger list icons
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '32px', // Larger container padding
          paddingBottom: '32px',
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          marginTop: '16px', // Larger grid spacing
        },
      },
    },
  },
});


