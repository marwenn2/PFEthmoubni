import React, { useEffect, useState } from "react";
import axios from 'axios';
const AffichageAnnonce = () => {
    const [annonce,setannonces] = useState([]);
    useEffect(()=> {
        axios.get('http://localhost:5000/annonce/recupererannonce')
        .then(res => {
            console.log(res.data);
            setannonces(res.data);
            console.log(annonce)
        })
    },[])
    return(
        <>{annonce.map(ann=> {
            return(
            <div className="card">
            <div className="card-header">
              {ann.title}
            </div>
            <div className="card-body">
              <h5 className="card-title">{ann.name}</h5>
              <p className="card-text">{ann.text}</p>
              <label className="">{ann.date.substring(0,10)}</label>
              <a href="#" className="btn btn-primary">détails de l'annonce</a>
              
            </div>
          </div>
          )
        })
        
        }</>)
}
export default AffichageAnnonce;