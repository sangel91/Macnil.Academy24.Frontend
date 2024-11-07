import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./ListItems.css";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HomeIcon from '@mui/icons-material/Home';



interface MainListItemsProps {
  callback: (page: string, path: string) => void; // Tipizzazione corretta
}

export function MainListItems(props: MainListItemsProps) {
  const navigate = useNavigate();
  
  return (
    <>
    
        {/* <img className="logo" src="./macnil_logo.png" alt="" /> */}
      <ListItemButton>
        <ListItemIcon>
        <HomeIcon />
        </ListItemIcon>
        <ListItemText
          primary="Home"
          onClick={() => {
            if (props.callback) {
              props.callback("Dashboard", "/dashboard");  // Passa il nome della pagina e il percorso
            }
            navigate("/");  // Navigazione corretta
          }}
        />
      </ListItemButton>
      
      

     

      <ListItemButton>
        <ListItemIcon>
        
        <NewspaperIcon />
        </ListItemIcon>
        <ListItemText primary="News" 
        onClick={() => {
          if (props.callback) {
            props.callback("News", "/news");  // Passa il nome della pagina e il percorso
          }
          navigate("/news");  // Navigazione corretta
        }}
        />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Report" />
      </ListItemButton>

      
    
    </>
  );
}
