import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { SearchContext } from "./searchcontext.js";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import titlelogo from "../assets/logo.png";
import Draww from "./drawer.js";
import { useState, useContext } from "react";

const style_box = {
  height: 30,
  width: 290,
  paddingLeft: "9%",
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const [search, setSearch] = useState("");
  const { setSearchResults } = useContext(SearchContext);

  const handlePress = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      setSearchResults(search);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "black" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Draww></Draww>
          <img src={titlelogo} style={style_box} />

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handlePress}
              value={search}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
