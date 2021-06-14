import React, { useEffect, useState } from 'react' ; 
import styled from 'styled-components' ;
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'
import loginSVG from '../assets/login.svg'
import axios from 'axios' ; 

const SignInButton = styled.button`
margin-top: 20px ; 
margin-left: 50% ; 
margin-botto: 100px ; 
background-color: #4b9deb ; 
border: 0 ; 
border-radius: 14px ; 
width: 10% ; 
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
display: flex ; 
flex-direction:column ;  
justify-content: center ; 
margin-bottom: 50px ; 
`
const SidePage = styled.div`
width: 35% ;  
height: 88vh ; 
`
const Flex= styled.div`
display: flex ; 
justify-content: space-between ; 

`
const RowFlex = styled.div`
margin-left: 30% ; 
display: flex; 
flex-wrap: wrap; `
const IMG = styled.img`
 width: 250% ; 
 height: 100%;
`
const Error= styled.div`
color: red;`
const RegisterPage = ()=>{

    const [email , setEmail ] = useState("") ; 
    const [password, setPassword] = useState("") ; 
    const [firstName,setFirstName]= useState("") ; 
    const [lastName,setLastName]= useState("") ; 
    const [phoneNumber,setPhoneNumber]= useState("") ; 
    const [birthDate,setBirthDate]= useState("") ; 
    const [adress,setAdress]= useState("") ; 
    const [skills,setSkills] = useState("") ; 
    const [error,setError]= useState("") ; 

    const handleClick = async()=> {
        try {
            const response = await axios.post('/users/login',{email,password})  
            localStorage.setItem("token",response.data.token) ;   
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
  
        <h2 style={{marginLeft: "150px"}}>Register to Khadamny</h2>
        <Error>{error}</Error>    
        
        <form>
            <RowFlex>
            <div style={{marginLeft:"50px"}}>
            <h4>Email adress</h4>
            <TextField label="Email" color='primary'
            variant='outlined'
            type='email'
            error={Boolean(error)}
            onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            
            <div style={{marginLeft:"50px"}}>
            <h4>Password</h4>
            <TextField label="Password" variant='outlined'
            type='password'
            onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div style={{marginLeft:"50px"}}>
            <h4>First name : </h4>
            <TextField label="First name" variant='outlined'
            type='text'
            onChange={(e)=>setPassword(e.target.value)}/>
            </div>
           
            <div style={{marginLeft:"50px"}}>
             <h4>Last name: </h4>
            <TextField label="Last name" variant='outlined'
            type='text'
            onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <div style={{marginLeft:"50px"}}>
             <h4>Phone number:</h4>
            <TextField label="Phone number" variant='outlined'
            type='tel'
            onChange={(e)=>setPassword(e.target.value)}/>
</div>
<div style={{marginLeft:"50px"}}>
             <h4>Adress:</h4>
            <TextField label="Adress" variant='outlined'
            type='text'
            onChange={(e)=>setPassword(e.target.value)}/>
</div>

<div style={{marginLeft:"50px"}}>
             <h4>Skills:</h4>
            <TextField label="Skills" variant='outlined'
            type='text'
            onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div style={{marginLeft:"50px"}}>
             <h4>Birth Date</h4>
            <TextField  variant='outlined'
            type='date'
            onChange={(e)=>setPassword(e.target.value)}/>
</div>
            </RowFlex>
        </form>
        <SignInButton onClick={handleClick}>Create account </SignInButton>
        </ColWrapper>
    </Flex>
    
       
    </>
)
}

export default RegisterPage ; 

