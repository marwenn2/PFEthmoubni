import styled from 'styled-components' ;
import {Link, useHistory} from 'react-router-dom'
import home from "../assets/home.jpg";

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
justify-content: flex-start ; 
margin-bottom: 50px ; 
`
const SidePage = styled.div`
padding-top: 100px;
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
 
`
const Error= styled.div`
color: red;`

const Label = styled.h4`
margin-top: 10px ; 
font-size: 18px ; 
`
const H2 = styled.h2`
position: absolute;
left: 0;
right: 150px;
top: 300px;
`
const Home =() => {
    return(
    <Flex> 
    <SidePage>
        <IMG src={home}></IMG>
     </SidePage>
    <ColWrapper>
    <H2>Bienvenue au meilleur site de jobbing</H2>
    </ColWrapper>
    </Flex>)
}
export default Home;