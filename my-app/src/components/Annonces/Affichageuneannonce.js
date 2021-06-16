import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import { FaTrashAlt } from 'react-icons/fa';
import { Collapse,Card,CardBody,Button,Modal,ModalHeader,ModalBody,FormGroup,Form,Label,Input,ListGroup, ListGroupItem } from "reactstrap";
const AffichageuneAnnonce = () => {
    const {id}= useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [comments,setcomments]= useState([]);
    const toggle = () => setIsOpen(!isOpen);
    const [isOpen1, setIsOpen1] = useState(true);
    const toggle1 = () => setIsOpen1(!isOpen1);
    const [annonce,setannonces] = useState();
    const [idd,setidd] = useState();
    const [user,setuser] = useState();
    const [ismodalOpen,setismodalOpen]= useState(false);
    const toggleModal=()=> {
      setismodalOpen(!ismodalOpen);
    }
    const [commentairez,setcommentaire] = useState("");
    const token = localStorage.getItem("token");
    const iduser= localStorage.getItem("id").toString();
   
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
       
    })
    const ondelete = idc => {
      axios.delete(`http://localhost:5000/commentaire/deletecommentaire/${id}/${idc}`, { headers: {
        "x-auth-token" : token
      }}).then(res =>console.log(res))
    }
    const onchange = e => {
      setcommentaire(e.target.value)
    }
    const onsubmit = e =>{
      e.preventDefault();
      const Commentairee = {
          comment : commentairez
      }
      
      axios.post(`http://localhost:5000/commentaire/addComment/${id}`,Commentairee, { headers: {
        "x-auth-token" : token
      }})
      .then(res => console.log(res) )
    }
    function affichage()
    {
      return(
         
            <ListGroup>
            <ListGroupItem>Cras justo odio</ListGroupItem>
          </ListGroup>
          
      )
    }
    return(
        <>
        <div style={{marginTop:"100px"}} className="container">
        <div className="row">
            <div className="col-6">
            <div className="card" style={{fontFamily:"'Baloo Tammudu 2' ,sans-serif"}}>
            <div className="card-header">
              {annonce &&annonce.title}
            </div>
            <div className="card-body">
            <dl className="row p-1">
                  <dt className="col-6">libelle : </dt>
                  <dd className="col-6">{annonce&&annonce.name}</dd>
                  <dt className="col-6">categorie : </dt>
                  <dd className="col-6">{annonce&&annonce.categorie}</dd>
                  <dt className="col-6">Zone : </dt>
                  <dd className="col-6">{annonce&&annonce.zone}</dd>
                  <dt className="col-6">Description : </dt>
                  <dd className="col-6">{annonce&&annonce.text}</dd>
                  <dt className="col-6">Date d'annonce : </dt>
                  <dd className="col-6">{annonce&&annonce.date.substring(0,10)}</dd>
                  </dl>
           
             
              <br/>
              <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Informations personnelles </Button>
              <Collapse isOpen={isOpen} >
                    <Card>
                  <CardBody>
                  <dl className="row p-1">
                  <dt className="col-6">Nom : </dt>
                  <dd className="col-6">{user&&user.Lastname}</dd>
                  <dt className="col-6">Prenom :</dt>
                  <dd className="col-6">{user && user.Firstname}</dd>
                  <dt className="col-6">Email : </dt>
                  <dd className="col-6"> {user &&  user.email}</dd>
                  <dt className="col-6">Numero : </dt>
                  <dd className="col-6"> {user &&  user.phonenumber}</dd>
                  
                </dl>
                 
                  
                 
                  </CardBody>
                </Card>
              </Collapse>
              
              
              <Modal isOpen={ismodalOpen} toggle={()=>toggleModal()}>
          <ModalHeader toggle={()=>toggleModal()}>Ajouter votre commentaire</ModalHeader>
          <ModalBody>
            <Form onSubmit={e=> onsubmit(e)}>
              <FormGroup>
                <Label htmlFor="commentaire">Commentaire</Label>
                <Input
                  type="text"
                  id="commentaire"
                  name="commentaire"
                  onChange={ e=> onchange(e)}
                />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Ajouter
              </Button>
            </Form>
          </ModalBody>
        </Modal>
            </div>
            
          </div>
          
          </div>
          <div className="col-6">
                        <div className="card" style={{fontFamily:"'Baloo Tammudu 2' ,sans-serif"}}>
                            <div className="card-body">
                            <Button color="primary right" onClick={toggle1} style={{ marginBottom: '1rem' }}>Nombre de commentaires : {comments.length}</Button>
              <Collapse isOpen={isOpen1}>
                    { comments.length >0 ?  <ListGroup>{ comments.map((com,index)=> {
                      return(
                      <ListGroupItem key={index}> 
                        <dl className="row p-1">
                  <dt className="col-6"> {com.comment}</dt>
                  {
                        iduser=== com.user.toString()?  <dd className="col-6"> <FaTrashAlt color="red" onClick={()=> ondelete(com._id)}></FaTrashAlt> </dd>:null} 
                  
                  </dl>
                      </ListGroupItem>
                    )})          }  </ListGroup>      
               :<Card><CardBody><p>il n'y a pas de commentaire pour cette annonce </p></CardBody></Card>  }
                
              </Collapse>
              <br/>
              <Button outline onClick={()=>toggleModal()}>
                    <span className="fa fa-sign-in fa-lg" /> Ajouter commentaire
                  </Button>
                            </div>
                         </div>
          </div>
          </div>
          
        </div></>)
}
export default AffichageuneAnnonce;