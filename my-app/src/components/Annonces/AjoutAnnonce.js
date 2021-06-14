import React, { useEffect, useState } from "react";
import { Container, FormGroup,Label, Input,Button,Form,Row,Col } from 'reactstrap';
import { Zones } from '../../shared/zones';
import  { Categories } from '../../shared/categories';
import axios from 'axios';
const AjoutAnnonce = () => {
  const [formData, setFormData] = useState({
    text: '',
    title: '',
    name: '',
    categorie: '',
    zone: ''
});
const token = localStorage.getItem("token");
const { text,
  title,
  name,
  categorie,
  zone} = formData;
  const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onsubmit = e =>{
    e.preventDefault();
    const annonce = { title: title,name:name,text:text,categorie:categorie,zone:zone};
    axios.post('http://localhost:5000/annonce/',annonce, { headers: {
      "x-auth-token" : token
    }})
    .then(res=> console.log(res))
  }

return (
  <>
  
    
<Container>
  <Row>
    <Col md="8">
<Form onSubmit={e => onsubmit(e)}>
              <FormGroup>
                <Label htmlFor="title">title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={e => onchange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={e => onchange(e)}                
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text">description</Label>
                <Input
                  type="textarea"
                  id="text"
                  name="text"
                  value={text}
                  onChange={e => onchange(e)}
                />
              </FormGroup>
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
            </Col>
            </Row>
            </Container>
</>
      );
    };

    export default AjoutAnnonce;