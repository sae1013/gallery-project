import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Header.module.scss";
import { userActions } from "../redux/modules/user";
import { logoutFB } from "../shared/api/Auth";
import { apiKey } from "../shared/firebase";
import NotiBadge from "../components/notify/NotiBadge";
import Spinner from "../elements/Spinner";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SendIcon from "@material-ui/icons/Send";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  logo: {
    marginLeft: "20px",
    justifyContent: "flex-start",
    color: "white",
  },

  login: {},

  menuButton: {
    marginRight: "30px",
  },

  toolbar: {
    width: "100%",
  },

  badge: {
    marginLeft: "auto",
  },
  favoriteIcon: {
    color: "white",
    fontSize: "27px",
  },
  loginButton: {
    marginLeft: "auto",
    color: "white",
  },
  white: {
    color: "white",
  },
  signup: {
    marginRight: "50px",
  },
}));

function Header(props) {

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLogin = useSelector((state) => state.user.isLogin);
  const isLoading = useSelector((state) => state.user.isLoading); // userLogin 인증 중일때.
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const logoutHandler = () => {
    dispatch(logoutFB());
  };

  let view = ( // not loggedIn view
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <IconButton className={classes.logo} component={Link} to="/">
          Logo
        </IconButton>
        <Button className={classes.loginButton} component={Link} to="/login">
          <ListItemIcon className={classes.white}>
            <ExitToAppIcon fontSize="small" />
            <Typography variant="inherit">LogIn</Typography>
          </ListItemIcon>
        </Button>

        <Button className={classes.signup} component={Link} to="/signup">
          <Typography inherit className={classes.white}>
            sign up
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );

  if (isLoading) {
    return null;
  }

  if (isLogin) {
    view = (
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <IconButton className={classes.logo} component={Link} to="/">
            Logo
          </IconButton>

          {/* <Button className={classes.badge}>
            <Badge>
              <FavoriteIcon className={classes.favoriteIcon} />
            </Badge>
          </Button> */}

          <Button color="inherit" className={classes.badge}>
            <NotiBadge></NotiBadge>
          </Button>

          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-haspopup="true"
            aria-label="menu"
            aria-controls="long-menu"
            onClick={handleClick}
          >
            <MenuIcon  />
          </IconButton>
        </Toolbar>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              logoutHandler();
            }}
          >
            로그아웃
          </MenuItem>
          <MenuItem component={Link} to='/profile'>내 정보</MenuItem>
        </Menu>
      </AppBar>
    );
  }

  return view;
}

export default Header;
