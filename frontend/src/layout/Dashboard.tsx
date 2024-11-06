// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Badge from "@mui/material/Badge";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import MuiDrawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import * as React from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import { MainListItems } from "./ListItems";  // Assuming your list items are in this component
// import { Page1Content } from "./Page1";      // Assuming Page1 is a content page

// const drawerWidth: number = 240;

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   "& .MuiDrawer-paper": {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     boxSizing: "border-box",
//     ...(!open && {
//       overflowX: "hidden",
//       transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       width: theme.spacing(7),
//       [theme.breakpoints.up("sm")]: {
//         width: theme.spacing(9),
//       },
//     }),
//   },
// }));

// const mdTheme = createTheme();

// export function Dashboard() {
//   const [open, setOpen] = React.useState(true);
//   const toggleDrawer = () => {
//     setOpen(!open);
//   };
//   const [currentPage, setCurrentPage] = React.useState<string>("Dashboard");

//   const navigate = useNavigate();  // Per la navigazione dinamica

//   // Funzione per cambiare la pagina e aggiornare l'URL
//   const handleNavigation = (page: string, path: string) => {
//     setCurrentPage(page);
//     navigate(path);  // Modifica l'URL
//   };

//   React.useEffect(() => {
//     if (currentPage) {
//       console.log(currentPage);
//     }
//   }, [currentPage]);

//   return (
//     <ThemeProvider theme={mdTheme}>
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar position="absolute" open={open}>
//           <Toolbar
//             sx={{
//               pr: "24px", // keep right padding when drawer closed
//             }}
//           >
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="open drawer"
//               onClick={toggleDrawer}
//               sx={{
//                 marginRight: "36px",
//                 ...(open && { display: "none" }),
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography
//               component="h1"
//               variant="h6"
//               color="inherit"
//               noWrap
//               sx={{ flexGrow: 1 }}
//             >
//               {currentPage}
//             </Typography>
//             <IconButton color="inherit">
//               <Badge badgeContent={4} color="secondary">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//         <Drawer variant="permanent" open={open}>
//           <Toolbar
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-end",
//               px: [1],
//             }}
//           >
//             <IconButton onClick={toggleDrawer}>
//               <ChevronLeftIcon />
//             </IconButton>
//           </Toolbar>
//           <Divider />
//           <List component="nav">
//             <MainListItems callback={handleNavigation} />  {/* Passa la funzione per la navigazione */}
//           </List>
//         </Drawer>
//         <Box
//           component="main"
//           sx={{
//             backgroundColor: (theme) =>
//               theme.palette.mode === "light"
//                 ? theme.palette.grey[100]
//                 : theme.palette.grey[900],
//             flexGrow: 1,
//             height: "100vh",
//             overflow: "auto",
//           }}
//         >
//           <Toolbar />
//           <Routes>
//             <Route path="/page1" element={<Page1Content />} />
//             {/* Aggiungi altre rotte per altre pagine se necessario */}
//           </Routes>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MainListItems } from "./ListItems";
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
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              {currentPage}
            </Typography> */}
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", px: [1] }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems callback={handleNavigation} /> {/* Passa la funzione per la navigazione */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {/* Qui inserisci i contenuti passati come children */}
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}


