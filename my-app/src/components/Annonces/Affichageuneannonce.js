import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import { Collapse,Card,CardBody,Button } from "reactstrap";
const AffichageuneAnnonce = () => {
    const {id}= useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [comments,setcomments]= useState([]);
    const toggle = () => setIsOpen(!isOpen);
    const [isOpen1, setIsOpen1] = useState(false);
    const toggle1 = () => setIsOpen1(!isOpen1);
    const [annonce,setannonces] = useState();
    const [idd,setidd] = useState();
    const [user,setuser] = useState();
    useEffect(()=> {
        axios.get(`http://localhost:5000/annonce/recupererannonce/${id}`)
        .then(res => {
            console.log(res.data);
            setannonces(res.data);
            setidd(res.data.user)
            setcomments(res.data.comments)
            console.log(typeof res.data.user)
            axios.get(`http://localhost:5000/users/userid/60c609a438af769768680a0d`).then(res=> {
              setuser(res.data)
              console.log("zeaeazea"+res.data.email)
            })
        })
       
    },[])
  
    return(
        <>
        <div style={{marginTop:"100px"}}>
        
            
            <div className="card" >
            <div className="card-header">
              {annonce &&annonce.title}
            </div>
            <div className="card-body">
              <h5 className="card-title">{annonce &&annonce.name}</h5>
              <p className="card-text">{annonce &&annonce.text}</p>
              <label className="">{annonce &&annonce.date.substring(0,10)}</label>
              <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Show user details</Button>
              <Collapse isOpen={isOpen}>
                    <Card>
                  <CardBody>
                  <p>{user&&user.Firstname}{user && user.Lastname}</p>
                  
                  {user &&  user.email}
                  </CardBody>
                </Card>
              </Collapse>
              <Button color="primary" onClick={toggle1} style={{ marginBottom: '1rem' }}>Show user details</Button>
              <Collapse isOpen={isOpen1}>
                    { comments.length===0?<Card><CardBody><p>il n'y a pas de commentaire pour cette annonce </p></CardBody></Card> : annonce.comments.map((comment,index) =>{
                      <Card>
                  <CardBody>
                    {comment.comment}
                  </CardBody>
                      </Card>
                    })
                      
                }
              </Collapse>
            </div>
          </div>
          
        
        
        </div></>)
}
export default AffichageuneAnnonce;