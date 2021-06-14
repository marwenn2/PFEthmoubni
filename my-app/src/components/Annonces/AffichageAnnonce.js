import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import axios from 'axios';
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
        <div style={{marginTop:"100px"}}>
          {annonce.map(ann=> {
          return(
            <div className="card" key={ann._id}>
            <div className="card-header">
              {ann.title}
            </div>
            <div className="card-body">
              <h5 className="card-title">{ann.name}</h5>
              <p className="card-text">{ann.text}</p>
              <label className="">{ann.date.substring(0,10)}</label>
              <button onClick={()=>handledetails(ann._id)}>aaa</button>
              
            </div>
          </div>
          )
        })
        
        }</div></>)
}
export default AffichageAnnonce;