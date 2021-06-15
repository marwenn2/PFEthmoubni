import React, { useEffect, useState } from "react";
import { Container, FormGroup,Label, Input,Button,Form,Row,Col,Breadcrumb,BreadcrumbItem } from 'reactstrap';
import { Zones } from '../../shared/zones';
import  { Categories } from '../../shared/categories';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
const AjoutAnnonce = () => {
  const [formData, setFormData] = useState({
    text: '',
    title: '',
    name: '',
    categorie: '',
    zone: ''
});
const history= useHistory();
const token = localStorage.getItem("token");
const { text,
  title,
  name,
  categorie,
  zone} = formData;
  const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onsubmit = e =>{
    e.preventDefault();
    console.log(token)
    const annonce = { title: title,name:name,text:text,categorie:categorie,zone:zone};
    axios.post('http://localhost:5000/annonce/',annonce, { headers: {
      "x-auth-token" : token
    }})
    .then(res=> console.log(res))
    history.push('/offre');
  }

return (
  <>
  <div className="container">
  <div className="row">
        
        <div className="col-12">
          <h3>Ajouter une annonce</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content" style={{marginBottom:"50px"}}>
      <div className="col-12 col-md-6 offset-3">
      <Form onSubmit={e => onsubmit(e)}>
              <Row className="form-group">
               
                <Col>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="entrez un titre pour votre annonce"
                  value={title}
                  onChange={e => onchange(e)}
                /></Col>
              </Row>
              <Row className="form-group">
              <Col>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="entrez un libelle pour votre annonce"
                  onChange={e => onchange(e)}                
                />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                <Input
                  type="textarea"
                  id="text"
                  name="text"
                  placeholder="entrez votre description"
                  value={text}
                  rows={8}
                  onChange={e => onchange(e)}
                />
                </Col>
              </Row>
              <FormGroup>
                <Label htmlFor="Catégorie">Catégorie</Label>
                <Input type="select" className="form-control" id="categorie" name="categorie" onChange={e => onchange(e)}>
                  {
                    Categories.map((cat,index)=> { 
                      return(
                      <option value={cat} key={index}>
                        {cat}
                        </option>
                    )})
                  }
                             
                            
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="zone">Zone</Label>
                <Input type="select" className="form-control" id="zone" name="zone" onChange={e => onchange(e)}>
                  {
                    Zones.map((zone,index)=> { 
                      return(
                      <option value={zone} key={index}>
                        {zone}
                        </option>
                    )})
                  }
                             
                            
                </Input>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Ajouter annonce
              </Button>
            </Form>
        </div>
      </div>
  </div>
</>
      );
    };

    export default AjoutAnnonce;