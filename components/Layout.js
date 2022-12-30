import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { createTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useContext, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import classes from "../utils/classes";
import { getError } from "../utils/error";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useRouter } from "next/router";
import NextLink from "next/link";
//importing icons
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  Badge,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
  TextField,
  InputAdornment,
} from "@mui/material";

import Footer from "./Footer";

import { Store } from "../utils/Store";

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;

  const theme = createTheme({
    shadows: ["none"],
    components: {
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
    },

    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#ffea00",
      },
    },
  });

  const router = useRouter();

  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const darkModeChangeHandler = () => {
  //   dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
  //   const newDarkMode = !darkMode;
  //   Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  // };
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    Cookies.remove("shippinhAddress");
    Cookies.remove("paymentMethod");
    router.push("/");
  };

  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Hollywood Fashion` : "Hollywood Fashion"}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar position="fixed" sx={classes.appbar} elevation={1}>
          <Box sx={classes.titlebar} elevation={1}>
            <Typography>Hollywood Fashion Sale</Typography>
          </Box>
          <Toolbar sx={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
                sx={classes.menuButton}
              >
                <MenuIcon sx={classes.navbarButton} />
              </IconButton>
              <form onSubmit={submitHandler}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Search ..."
                  style={{ margin: 5 }}
                  size="small"
                  onChange={queryChangeHandler}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton type="submit">
                          <SearchOutlinedIcon sx={classes.navbarButton} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Box>
            <Drawer
              anchor="left"
              open={sidbarVisible}
              onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>Shopping by category</Typography>
                    <IconButton
                      aria-label="close"
                      onClick={sidebarCloseHandler}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                      onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
                <Divider light />
                <NextLink href={`/`} passHref>
                  <ListItem button component="a">
                    <ListItemText primary={"Home"}></ListItemText>
                  </ListItem>
                </NextLink>
                {userInfo ? (
                  <>
                    <NextLink href={`/profile`} passHref>
                      <ListItem
                        button
                        component="a"
                        onClick={sidebarCloseHandler}
                      >
                        <ListItemText primary={"Profile"}></ListItemText>
                      </ListItem>
                    </NextLink>
                    <NextLink href={`/order-history`} passHref>
                      <ListItem
                        button
                        component="a"
                        onClick={sidebarCloseHandler}
                      >
                        <ListItemText primary={"Order"}></ListItemText>
                      </ListItem>
                    </NextLink>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </>
                ) : (
                  <NextLink href={`/login`} passHref>
                    <ListItem
                      button
                      component="a"
                      onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary={"login"}></ListItemText>
                    </ListItem>
                  </NextLink>
                )}
              </List>
            </Drawer>

            <Box sx={isDesktop ? classes.visible : classes.hidden}>
              <NextLink href="/" passHref>
                <Link>
                  <Typography sx={classes.brand}>Hollywood Fashion </Typography>
                </Link>
              </NextLink>
            </Box>
            <Box>
              <NextLink href="/cart" passHref>
                <Link>
                  <Typography component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        <ShoppingBagOutlinedIcon />
                      </Badge>
                    ) : (
                      <ShoppingBagOutlinedIcon />
                    )}
                  </Typography>
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    sx={isDesktop ? classes.navbarButton : classes.hidden}
                  >
                    <PersonOutlinedIcon />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, "/order-history")
                      }
                    >
                      Order Hisotry
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/admin/dashboard")
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link sx={isDesktop ? classes.visible : classes.hidden}>
                    <Badge color="secondary" badgeContent={"login!"}>
                      <PersonOutlinedIcon />
                    </Badge>
                  </Link>
                </NextLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <div className="margin"></div>

        <Container component="main" sx={classes.main}>
          {children}
        </Container>
        <Box component="footer" sx={classes.footer}>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}
