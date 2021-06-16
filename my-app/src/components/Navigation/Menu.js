import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components'
import { useHistory } from 'react-router';
import Avatar from '@material-ui/core/Avatar';




const StyledButton = styled.button`
display: flex ; 
padding-top: 8px ; 
justify-content: center ; 
align-items: center ; 
margin: 10px ;
margin-left: 25px ; 
background: transparent ; 
border: 0 ;  
font-family: 'Baloo Tammudu 2' ,sans-serif ; 
font-size: 17px ; 
font-weight: 400 ; 
transition-duration: 0.3s ; 
border-radius: 14px ;
 
&: hover{
    background-color: #f7fafc ; 
    cursor: pointer ;   

}
`
export default function SimpleMenu({isAuth,setIsAuth,avatar}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory() ; 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile=()=>{
      handleClose() ;
      history.push('/profile') ;  

  }
  const handleLogout=()=>{
      handleClose() ;
      setIsAuth(false) ;  
      localStorage.removeItem("token"); 
      history.push('/login')
      
  }

  return (
    <div>
      <StyledButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      <Avatar alt='myAvatar' src={avatar}></Avatar>
      </StyledButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
