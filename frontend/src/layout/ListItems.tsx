

import LayersIcon from "@mui/icons-material/Layers";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import "./ListItems.css";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

interface MainListItemsProps {
  callback: (page: string, path: string) => void;
}

export function MainListItems(props: MainListItemsProps) {
  const navigate = useNavigate();

  // Recupero i dati dell'utente dal localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAuthenticated = user && user.email && user.password;
  const isAdmin = isAuthenticated ? user.isAdmin : false;

  return (
    <>
      {/* Collegamento a Home */}
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText
          primary="Home"
          onClick={() => {
            if (props.callback) {
              props.callback("Dashboard", "/dashboard");
            }
            navigate("/");
          }}
        />
      </ListItemButton>

      {/* Collegamento a News */}
      <ListItemButton>
        <ListItemIcon>
          <NewspaperIcon />
        </ListItemIcon>
        <ListItemText
          primary="News"
          onClick={() => {
            if (props.callback) {
              props.callback("News", "/news");
            }
            navigate("/news");
          }}
        />
      </ListItemButton>

      {/* Collegamento a Report (da implementare) */}
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Report" />
      </ListItemButton>

      {/* Collegamento a Users (visibile solo se l'utente è un admin) */}
      {isAuthenticated && isAdmin && (
        <ListItemButton onClick={() => navigate("/users")}>
          <ListItemIcon>
           
          <AdminPanelSettingsIcon/>

          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      )}
    </>
  );
}
