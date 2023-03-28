import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { asyncStorageKeys, labels } from "../dictionary";
import { useNavigate } from "react-router-dom";
import { getAuthorizationStatus } from "../utils/getAuthorizationStatus";

export default function MenuAppBar() {
  const [logo, setLogo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigation = useNavigate();

  function handleLogout() {
    localStorage.removeItem(asyncStorageKeys.login);
    navigation('/')
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const authorizationData = getAuthorizationStatus();
    if (authorizationData) {
      setLogo(authorizationData?.email?.substring(0, 1));
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {labels.tasks}
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              style={{
                background: "white",
                color: "black",
              }}
            >
              {logo?.toUpperCase()}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
