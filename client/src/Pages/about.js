import React from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); 


const bread_style={
  marginTop:80,
  marginLeft:20,
  marginBottom:20
};

const content_style={
  marginLeft:20
};

const About = () => {
return (
  <>
      <div className="bread" style={bread_style}>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="/"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb component="a" label="About" icon={<InfoIcon fontSize="small" />}/>
        
      </Breadcrumbs>
      </div>
      
      <div className="content" style={content_style}>
        <h1>About</h1>
        <br></br>
        <p>Mad Stuffs page is the one stop destination for Content writing.</p>
      </div>
     
	
  </>
);
};

export default About;
