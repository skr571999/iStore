import React, { useDispatch, useGlobal, useState } from "reactn";

import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { setUserDetailReducer } from "../../reducers";
import { APP_NAME, FRONTEND_ENDPOINTS } from "../../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    list: {
      width: "auto",
      height: "100vh",
      paddingTop: "5rem",
    },
  })
);

const NavBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isLogin } = useGlobal("userDetail")[0];
  const setGlobalUserDetail = useDispatch(setUserDetailReducer);
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.clear();
    setGlobalUserDetail();
    history.push("/login");
  };

  return (
    <>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Hidden smUp>
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleDrawer}
              color="inherit"
              aria-label="menu"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Hidden>
          <Typography variant="h6" noWrap className={classes.title}>
            {APP_NAME}
          </Typography>
          <Hidden xsDown>
            {FRONTEND_ENDPOINTS.filter(
              (value) =>
                value.protect === isLogin || value.protect === undefined
            ).map((val, index) => (
              <Button
                key={val.link}
                component={RouterLink}
                to={val.link}
                color="inherit"
              >
                {val.name}
              </Button>
            ))}
            {isLogin && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <Drawer variant={"persistent"} anchor="top" open={open}>
          <div className={classes.list} role="presentation">
            <List>
              {FRONTEND_ENDPOINTS.filter(
                (value) =>
                  value.protect === isLogin || value.protect === undefined
              ).map((val, index) => (
                <ListItem
                  button
                  key={val.link}
                  component={RouterLink}
                  to={val.link}
                  onClick={handleDrawer}
                >
                  <ListItemText primary={val.name} />
                </ListItem>
              ))}
              {isLogin && (
                <ListItem
                  button
                  onClick={() => {
                    handleLogout();
                    handleDrawer();
                  }}
                >
                  <ListItemText primary={"Logout"} />
                </ListItem>
              )}
            </List>
          </div>
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavBar;
