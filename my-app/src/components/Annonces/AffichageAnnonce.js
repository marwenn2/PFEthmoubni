import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import axios from 'axios';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  
} from "reactstrap";
import { Link } from "react-router-dom";
const AffichageAnnonce = () => {
  const history = useHistory() ; 

    const [annonce,setannonces] = useState([]);
    useEffect(()=> {
        axios.get('http://localhost:5000/annonce/recupererannonce')
        .then(res => {
            console.log(res.data);
            setannonces(res.data);
            console.log(annonce)
        })
    },[])
    const handledetails=(id)=> {
        history.push(`/annonce/${id}`)
    }
    return(
        <>
       
       <div className="container">
      <div className="row" >
       
        <div className="col-12">
          <h3>Toutes nos annonces</h3>
          <hr />
        </div>
      </div>
       {annonce.map(element => {
         return(
          <div className="row row-content" style={{marginBottom:"50px"}} style={{fontFamily:"'Baloo Tammudu 2' ,sans-serif"}}>
          <div className="col-12 col-md-6">
            <h2>Description</h2>
            <p>
              {element.categorie}
            </p>
            <p>
              
              <em>{element.name}</em>, 
            </p>
           <p>{element.text}</p> 
          </div>
          <hr />
          <div className="col-12 col-md-5">
            <Card>
             
              <CardHeader className="text-black" style={{backgroundColor:"#AED6F1"}}>
                Quelques informations
              </CardHeader>
              <CardBody>
                <dl className="row p-1">
                  <dt className="col-6">Started</dt>
                  <dd className="col-6">{element.date.substring(0,10)}</dd>
                  <dt className="col-6">Nombre de commentaire</dt>
                  <dd className="col-6">{element.comments.length}</dd>
                  <dt className="col-6">Plus d'informations</dt>
                  <dd className="col-6"><Button style={{backgroundColor:"#FFCCA3",color:"black",border:"0",paddingTop:"12px",}} onClick={()=>handledetails(element._id)}>Details</Button></dd>
                </dl>
              </CardBody>
            </Card>
            <hr />
          </div>
        
         </div> 
         
         )
       })

       }
           

       </div>
        </>)
}
export default AffichageAnnonce;