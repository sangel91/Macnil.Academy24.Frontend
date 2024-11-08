/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import MenuIcon from "@mui/icons-material/Menu";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MainListItems } from "./ListItems";
import { ReactNode, useEffect, useState } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Definizione dell'interfaccia INews
interface INews {
  id: number;
  titolo: string;
  body: string;
}

/////////////// recupero l'ultima news da mostrare in sezione home (singola card task di Marcello)
const News: React.FC = () => {
  const [newsList, setNewsList] = useState<INews[] | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // prod
        const response = await fetch("http://localhost:8090/api/v1/news");
        //// test locale
        //const response = await fetch('./posts.json');
        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.status}`);
        }
        const data: INews[] = await response.json();
        setNewsList(data);
      } catch (error) {
        console.error("Errore durante la fetch delle news:", error);
      }
    };

    fetchNews();
  }, []);

  const lastNews =
    newsList && newsList.length > 0 ? newsList[newsList.length - 1] : null;

  return (
    <div>
      <h1>Ultima News</h1>
      {lastNews ? (
        <div>
          <h2>{lastNews.titolo}</h2>
          <p>{lastNews.body}</p>
        </div>
      ) : (
        <p>Nessuna news disponibile.</p>
      )}
    </div>
  );
};

/////////////////////////////////////////////////////////////////////

interface HomePageProps {
  onLogout: () => void;
  children?: ReactNode;
}

const drawerWidth: number = 240;

// Interfaccia per i props dell'AppBar
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
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

// Funzione per il layout del Dashboard
export function Home({ children }: { children?: ReactNode }) {

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [currentPage, setCurrentPage] = React.useState<string>("Home");
  const navigate = useNavigate();

  const handleNavigation = (page: string, path: string) => {
    setCurrentPage(page);
    navigate(path);
  };

  React.useEffect(() => {
    if (currentPage) {
      console.log(currentPage);
    }
  }, [currentPage]);

  /////////////////// questo return mi gestisce la parte grafica generale della sezione news

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={isDrawerOpen}>
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(isDrawerOpen && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <IconButton color="inherit">
              <AccountCircleIcon className="mx-3" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={isDrawerOpen}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <img className="logo mx-4" src="./macnil_logo.png" alt="" />
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems callback={handleNavigation} />
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// Funzione principale per la pagina Home
const HomePage: React.FC<HomePageProps> = ({ onLogout, children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (page: string, path: string) => {
    console.log(page, path);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={isDrawerOpen}>
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(isDrawerOpen && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <div className="justify-content-end align-items-end">
              <IconButton color="inherit">
                <AccountCircleIcon className="mx-3" />
              </IconButton>
              <IconButton color="inherit">
                <ExitToAppIcon onClick={onLogout} className="mx-3" />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={isDrawerOpen}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <img className="logo mx-4" src="./macnil_logo.png" alt="" />
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems callback={handleNavigation} />
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <News />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
