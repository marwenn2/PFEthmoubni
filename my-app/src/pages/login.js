import React, { useEffect, useState } from 'react' ; 
import styled from 'styled-components' ;
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'
import loginSVG from '../assets/login.svg'
import axios from 'axios' ; 
import { useHistory } from 'react-router';

const SignInButton = styled.button`
margin-top: 20px ; 
margin-left: 50px ; 
background-color: #4b9deb ; 
border: 0 ; 
border-radius: 14px ; 
width: 60% ; 
color: white ; 


padding-top: 10px ; 
padding-bottom : 10px ; 
padding-left: 5px ; 
padding-right: 5px ;
transition-duration: 0.3s ; 
&: hover{
    opacity: 0.8;
    cursor: pointer;  
}


`

const FlexContainer = styled.div`
display: flex ; 
justify-content: space-between ; 
align-items: center ; 

`
const ColContainer = styled.div`
display: flex ; 
flex-direction:column ;  
justify-content: center ; 
`
const ColWrapper = styled.div`
margin-right: 18% ;  
display: flex ; 
flex-direction:column ;  
justify-content: center ; 
`
const SidePage = styled.div`
width: 35% ;  
height: 88vh ; 
`
const Flex= styled.div`
display: flex ; 
justify-content: space-between ; 

`
const IMG = styled.img`
 width: 160% ; 
 height: 100% ; 
`
const Label = styled.h4`
margin-top: 20px ; 
font-size: 18px ; 
`
const Error= styled.div`
color: red;`
const LoginPage = ({isAuth,setIsAuth})=>{
    const history = useHistory() ; 
    const [email , setEmail ] = useState("") ; 
    const [password, setPassword] = useState("") ; 
    const [error,setError]= useState("") ; 

    const handleClick = async()=> {
        try {
            const response = await axios.post('http://localhost:5000/users/login',{email,password})  
            localStorage.setItem("token",response.data.token) ;
            setIsAuth(true) ; 
            history.push('/');

        } catch (error) {
            setError(error.response.data.errors[0].msg) ; 
            console.log(error.response.data.errors[0].msg) ;  
        }
       
       
    }

return (
    <>  
    <Flex> 
    <SidePage>
        <IMG src={loginSVG} ></IMG>
     </SidePage>
    <ColWrapper>
    <span>Don't have an account ?               
    <Link to='/register'> Register</Link>
    </span>
        <h2 style={{marginTop:"20px"}}>Login to Khadamny</h2>
        <Error>{error}</Error>    
        
        <form>
            <Label>Email adress</Label>
            <TextField label="Email" color='primary'
            fullWidth={true}
            variant='outlined'
            type='email'
            error={Boolean(error)}
            onChange={(e)=>setEmail(e.target.value)}/>
            

            <ColContainer>
            <FlexContainer>
            <Label>Password</Label>
            <Link to='/forgot-password'>forgot password ?</Link>
            </FlexContainer>
            

            <TextField label="Password" variant='outlined'
            type='password'
            onChange={(e)=>setPassword(e.target.value)}/>
            </ColContainer>
           
        </form>
        <SignInButton onClick={handleClick}>Sign in </SignInButton>
        </ColWrapper>
    </Flex>
    
       
    </>
)
}

export default LoginPage ; 