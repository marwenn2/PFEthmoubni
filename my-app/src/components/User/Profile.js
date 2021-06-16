import React,{useState,useEffect} from 'react' ; 
import styled from 'styled-components'
import { useHistory } from 'react-router';
import axios from 'axios'; 
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';



const Profile = ()=>{
    const history = useHistory() ; 
    const [email , setEmail ] = useState("") ; 
    const [password, setPassword] = useState("") ;
    const [newPassword,setNewPassword]= useState("");  
    const [firstName,setFirstName]= useState("") ; 
    const [lastName,setLastName]= useState("") ; 
    const [phoneNumber,setPhoneNumber]= useState("") ; 
    const [birthDate,setBirthDate]= useState("") ; 
    const [adress,setAdress]= useState("") ; 
    const [skills,setSkills] = useState("") ;
    const [userName, setUserName]= useState("") ;  
    const [error,setError]= useState() ; 
    const [user,setUser] = useState("") ;
    const [result,setResult]= useState();  
    console.log("error",error,"result",result); 
    useEffect(async()=>{
        console.log('useeffect')
        const token = localStorage.getItem("token")
            const response = await axios.get('http://localhost:5000/users/me',{headers:{
                'x-auth-token': token 
            }}) ;
            console.log(response.data)
            setFirstName(response.data.firstName) ; 
            setLastName(response.data.lastName) ; 
            setPhoneNumber(response.data.phoneNumber) ; 
            setAdress(response.data.adress) ; 
            setBirthDate(response.data.birthDate) ; 
            setEmail(response.data.email)
            
        },[])
        const handleSaveChanges=async()=>{
            await axios.post('http://localhost:5000/users/update',{email,firstName,lastName,phoneNumber,adress,birthDate})
        }
        const handleChangePassword= async()=>{
            const token= localStorage.getItem("token") ; 
            try {
               const response=  await axios.post('http://localhost:5000/users/change-password',{password,newPassword,token})    
                    setError("");
                    console.log(response.data.message)
                    setResult(response.data.message);  
            } catch (err) {
                setError(err.response.data.message) ; 
               
                
            }
            
        }
    return (
        <>
        <Container>
        <Paper component={Box}>
            
       <form>
            <RowFlex>
            <div style={{marginLeft:"50px"}}>
            <Label>Email adress</Label>
            <TextField  color='primary'
            variant='outlined'
            type='email'
            disabled={true}
            value={email} 
            error={Boolean(error)}
            onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            
         
            {/* <div style={{marginLeft:"50px"}}>
            <Label>Email adress</Label>
            <TextField label="User name" color='primary'
            variant='outlined'
            type='text'
            error={Boolean(error)}
            onChange={(e)=>setUserName(e.target.value)}/>
            </div> */}
            <div style={{marginLeft:"50px"}}>
            <Label>First name : </Label>
            <TextField  variant='outlined'
            type='text'
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}/>
            </div>
           
            <div style={{marginLeft:"50px"}}>
             <Label>Last name: </Label>
            <TextField  variant='outlined'
            type='text'
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}/>
            </div>

            <div style={{marginLeft:"50px"}}>
             <Label>Phone number:</Label>
            <TextField  variant='outlined'
            type='tel'
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e.target.value)}/>
</div>
<div style={{marginLeft:"50px"}}>
             <Label>Adress:</Label>
            <TextField  variant='outlined'
            type='text'
            value={adress}
            onChange={(e)=>setAdress(e.target.value)}/>
</div>

{/* <div style={{marginLeft:"50px"}}>
             <Label>Skills:</Label>
            <TextField label="Skills" variant='outlined'
            type='text'
            onChange={(e)=>setSkills(e.target.value)}/>
            </div> */}
            <div style={{marginLeft:"50px"}}>
             <Label>Birth Date</Label>
            <TextField  variant='outlined'
            type='date'
            value={birthDate}
            onChange={(e)=>setBirthDate(e.target.value)}/>
</div>
            </RowFlex>
        </form>
        
        </Paper>
       
        <SignInButton onClick={handleSaveChanges}>Save changes</SignInButton>
        <Paper component={Box2}>
        <Col>
        <Flex>   
        <Div >
            
            <Label>Ancient password :</Label>
            <TextField  variant='outlined'
            type='password'
            
            onChange={(e)=>setPassword(e.target.value)}/>
            </Div>
            <Div >
            <Label>New password :</Label>
            <TextField  variant='outlined'
            type='password'
            
            onChange={(e)=>setNewPassword(e.target.value)}/>

            </Div>
        </Flex>
        {result&& <Alert>{result&&result}</Alert>}
        {error&& <Alert severity="error">{error&&error}</Alert>}
            
            
           <StyledButton onClick={handleChangePassword}>Change password</StyledButton>
           
            </Col>
        </Paper>
        </Container>
        </>
    )
}
export default Profile ; 

const Col =styled.div`
display: flex; 
flex-direction: column ; 
justify-content: center; 
` 
const StyledButton= styled.button`
background-color: #4b9deb ; 
border: 0 ; 
border-radius: 14px ; 
width: 30% ; 
color: white ; 
position: relative; 
left: 40% ; 
top:40% ; 

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

const Container= styled.div`
background-color: #f2fbff ; 
padding-bottom: 150px ; 
`
const Div =styled.div`
margin-left: 50px ; 
width: 50% ;
`
const Box = styled.div`
padding:50px ;
padding-bottom: 80px ;  
width: 50% ;
left: 20% ; 
top: 10vh ; 
position: relative ; 
`
const Box2 = styled.div`
position: relative ; 
width: 50% ; 
left: 20% ; 
display: flex ; 
padding-bottom: 10% ; 
padding-top: 3% ; 
`
const SignInButton = styled.button`
margin-top: 20px ; 
margin-left: 50% ; 
position: relative ; 
right: 20% ; 
bottom: 20px ; 
margin-bottom: 100px ; 
background-color: #4b9deb ; 
border: 0 ; 
border-radius: 14px ; 
width: 15% ; 
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
display: flex; 
flex-wrap: wrap; `
const IMG = styled.img`
 width: 250% ; 
 height: 100%;
`
const Error= styled.div`
color: red;`

const Label = styled.h4`
margin-top: 10px ; 
position: relative ; 
left: 0 ;
font-size: 18px ; 
`