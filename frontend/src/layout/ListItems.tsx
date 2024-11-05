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

interface MainListItemsProps {
  callback: (a: any) => any;
}

export function MainListItems(props: MainListItemsProps)  {
  const navigate = useNavigate();
 return( <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" onClick={() => 
        {
          if (!!props?.callback) {
            props.callback("Dashboard");
          }
          navigate("dashboard"); 
        }
      }/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Page 1" onClick={() => 
        {
          if (!!props?.callback) {
            props.callback("Page 1");
          }
          navigate("page1"); 
        }
      } />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="News" />
      
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Report" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
        
      </ListItemIcon>
      <ListItemText primary="Page 40" />
    </ListItemButton>
  </React.Fragment>
);

}
