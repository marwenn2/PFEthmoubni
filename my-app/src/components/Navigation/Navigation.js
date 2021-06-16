import React, { useEffect ,useState} from 'react' ; 
import { useHistory } from 'react-router';
import styled from 'styled-components' ; 
import toolbox from '../../assets/toolbox.svg'
import SimpleMenu from './Menu';
import axios from 'axios' ; 


const Navigation=({isAuth,setIsAuth})=> {
    const history = useHistory() ; 
    const [avatar,setAvatar]= useState(""); 
    const [firstName,setFirstName]= useState(""); 
    const [lastName,setLastName] = useState("") ; 
    useEffect(async()=>{
    const token = localStorage.getItem("token")
        const response = await axios.get('http://localhost:5000/users/me',{headers:{
            'x-auth-token': token 
        }}) ; 
        setAvatar(response.data.avatar) ;
        setFirstName(response.data.firstName) ; 
        setLastName(response.data.lastName)  ; 
            console.log(response.data) ; 
        
    },[])
    
    const handleLogin=()=>{
        history.push('/login') ; 

    }
    const handleLogout=()=>{
        localStorage.removeItem("token")
        setIsAuth(false); 
        history.push('/login')
    }
  
    const handleannonce=()=> {
        history.push('/offre');
    }
    const handleannonce1=()=> {
        history.push('/posterannonce');
    }
    return(
        <>
    <Div>
        <WrapperFlex>
            <Logo>
            <Khaddamny onClick={()=> history.push('/')}>Khadamny</Khaddamny>
            <IMG src = {toolbox} alt="My Happy SVG"/>
            </Logo>
            
            <Wrapper>
            
            <StyledButton onClick={()=>history.push('/')}>Accueil</StyledButton>
            <StyledButton onClick={()=>handleannonce()}>Annonces</StyledButton>
            {isAuth?
             <div style={{display: "flex"}}>
                 
                  <StyledButton onClick={handleannonce1}>Ajouter Annonces</StyledButton>
                    <Name>
                        
                        <Content>{firstName} {lastName}</Content>
                        
                    </Name>
                 
                  <SimpleMenu isAuth={isAuth} setIsAuth={setIsAuth} avatar={avatar}>Account</SimpleMenu>
                  
             </div>
            :
            <StyledButton onClick={handleLogin}>Connexion</StyledButton>}
           
           
            </Wrapper>
           
        </WrapperFlex>
        </Div>
        
        </>
    )

}
export default Navigation ; 

const Name = styled.div`
margin-top: 20px ;
display: flex; 
justify-content: space-between ;    
font-family: 'Baloo Tammudu 2' ,sans-serif ; 
font-size: 17px ; 
font-weight: 400 ; 

`
const Content= styled.div`
font-family: 'Baloo Tammudu 2' ,sans-serif ;
padding-top:5px ; 
margin-left: 20px ;   
font-size: 17px ; 
`
const Div=styled.div`
position: sticky;
top: 0; 
background-color: white ; 
z-index: 1;
`
const WrapperFlex =styled.div`
display : flex ; 
justify-content: space-between ;  
box-shadow: 0 2px 4px 0 rgba(0,0,0,.2); 

`
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
const Khaddamny = styled.button`
color: #87abfa ; 
margin-left: 30px ; 
font-size: 25px ;
border:0 ; 
background-color: transparent; 

&: hover{
    cursor: pointer; 
}
`
const Wrapper = styled.div`
display : flex ; 
justify-content: space-between ;
align-items : center ; 
margin-right:30px ;  
`
const IMG= styled.img`
height: 30px ;
margin-left: 20px ;  
`
const Logo = styled.div`
display: flex ;
justify-content: space-around ; 
align-items: center;  `
