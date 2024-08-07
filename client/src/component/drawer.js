import ContactMailIcon from "@mui/icons-material/ContactMail";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Box } from "@mui/system";
import axios from "axios";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LogContext } from "./logcontext.js";

export default function SwipeableTemporaryDrawer() {
  const [author, setAuthor] = useState("");
  const [isLoading, setLoading] = useState(true);
  const { logged, setLogged } = useContext(LogContext);

  useEffect(() => {
    async function func() {
      if (logged == true) {
        await axios
          .get("https://mad-stuffs-uc64.vercel.app/getuser", {
            withCredentials: true,
          })
          .then((response) => {
            setAuthor(response.data);
          });
      }
    }
    func();
  }, [logged]);

  useEffect(() => {
    setLoading(false);
  }, [author]);

  const [state, setState] = useState({
    left: false,
  });
  const navigate = useNavigate();
  const list_style = {
    color: "black",
  };

  const handleClick = async (event) => {
    event.preventDefault();

    await axios
      .get("https://mad-stuffs-uc64.vercel.app/logout", {
        withCredentials: true,
      })
      .then(() => {
        setLogged(false);
      });

    navigate("/login");
    toast.success("Logged out successfully");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menu_color = {
    color: "white",
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={{ height: 64 }} style={{ backgroundColor: "black" }}>
        <CardHeader
          avatar={
            isLoading ? (
              <CircularProgress size={32} />
            ) : (
              <Avatar sx={{ bgcolor: "white", color: "black" }}>
                {logged ? author[0] : "?"}
              </Avatar>
            )
          }
          title={
            isLoading ? "Loading..." : logged ? author : "Login to Continue..."
          }
          sx={{
            backgroundColor: "black",
            color: "white",
            height: 10,
            paddingTop: 4,
          }}
        />
      </Box>

      <Divider />
      <List>
        <NavLink to={"/"} style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon style={list_style} />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ color: "black" }} />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink to={"/about"} style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon style={list_style} />
              </ListItemIcon>
              <ListItemText primary="About" sx={{ color: "black" }} />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink to={"/contact"} style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ContactMailIcon style={list_style} />
              </ListItemIcon>
              <ListItemText primary="Contact Us" sx={{ color: "black" }} />
            </ListItemButton>
          </ListItem>
        </NavLink>
        {logged ? (
          <div>
            <NavLink to={"/editpage"} style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ContactMailIcon style={list_style} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Edit My Page"
                    sx={{ color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </div>
        ) : (
          <div></div>
        )}
      </List>
      <Divider />
      <List>
        {logged == false ? (
          <div>
            <NavLink to={"/login"} style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon style={list_style} />
                  </ListItemIcon>
                  <ListItemText primary="LogIn" sx={{ color: "black" }} />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to={"/signup"} style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InfoIcon style={list_style} />
                  </ListItemIcon>
                  <ListItemText primary="SignUp" sx={{ color: "black" }} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </div>
        ) : (
          <NavLink onClick={handleClick} style={{ textDecoration: "none" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InfoIcon style={list_style} />
                </ListItemIcon>
                <ListItemText primary="LogOut" sx={{ color: "black" }} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      {["menu"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon style={menu_color} />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
