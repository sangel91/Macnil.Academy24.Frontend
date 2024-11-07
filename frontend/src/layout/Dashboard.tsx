/* eslint-disable @typescript-eslint/no-unused-vars */
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import { createTheme, styled } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

// Definire la larghezza del drawer
const drawerWidth: number = 240;

// Interfaccia per i props dell'AppBar
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// Interfaccia per i props del Dashboard, in cui accettiamo il prop `children`
interface DashboardProps {
  children?: ReactNode;  // `children` come ReactNode
}

// Personalizzazione del componente AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Personalizzazione del Drawer
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// Creazione del tema
const mdTheme = createTheme();

export function Dashboard({ children }: DashboardProps) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [currentPage, setCurrentPage] = React.useState<string>("Dashboard");
  const navigate = useNavigate(); // Per la navigazione dinamica

  // Funzione per cambiare la pagina e aggiornare l'URL
  const handleNavigation = (page: string, path: string) => {
    setCurrentPage(page);
    navigate(path); // Modifica l'URL
  };

  React.useEffect(() => {
    if (currentPage) {
      console.log(currentPage);
    }
  }, [currentPage]);

  return (
    
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
       
        
      
        
          
          {/* Qui inserisci i contenuti passati come children */}
          {children}
        
      </Box>
    
  );
}


