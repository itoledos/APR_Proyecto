import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import UserContext from "./contextos/user-context";
// REACT BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { BiUpload } from 'react-icons/bi';

const InitialData = {
    name: '',
    type: '',
    description: '',
    skillOne: '',
    skillTwo: '',
    skillThree: ''
};

const PetForm = (props) => {

    useEffect(()=> {
        if(!context.usuario){
        if(sessionStorage.getItem('USUARIO')){
            context.setUsuario(JSON.parse(sessionStorage.getItem('USUARIO')));
        }
        else {
          navigate('/login');
        }
        } 
        else {
        sessionStorage.setItem('USUARIO', JSON.stringify(context.usuario)); 
        }
    }
    , [])

    const context = useContext(UserContext)

    const navigate=useNavigate();
    const [formulario, setFormulario] = useState(
        InitialData
    );

    const updateForm = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/'+props.dir+'new', 
           formulario
        )
        .then(res=>{
            // DEFINIR VALIDACION FRONTEND!!!!!
            // COMPARAR CON BACKEND
            if(formulario.name.toString().length<3&&formulario.type.toString().length<3&&formulario.description.toString().length<3){
                console.log(Swal.fire(`Pet Name is required, minimum 3 characters\n Pet type is required, minimum 3 characters\n Pet description is required, minimum 3 characters`))
            } else if(formulario.name.toString().length<3&&formulario.type.toString().length<3) {
                console.log(Swal.fire(`Pet Name is required, minimum 3 characters\n Pet type is required, minimum 3 characters`))
            } else if(formulario.name.toString().length<3&&formulario.description.toString().length<3) {
                console.log(Swal.fire(`Pet Name is required, minimum 3 characters\n Pet description is required, minimum 3 characters`))
            } else if(formulario.type.toString().length<3&&formulario.description.toString().length<3) {
                console.log(Swal.fire(`Pet type is required, minimum 3 characters\n Pet description is required, minimum 3 characters`))
            } else if(formulario.name.toString().length<3){
                console.log(Swal.fire('Pet name is required, minimum 3 characters'))
            } else if(formulario.type.toString().length<3){
                console.log(Swal.fire('Pet type is required, minimum 3 characters'))
            } else if(formulario.description.toString().length<3){
                console.log(Swal.fire('Pet description is required, minimum 3 characters'))
            } else {
                Swal.fire(`Pet added successfully`);
                navigate('/')
            }
        })
        .catch(err=>alert(err))
    }

    return(
        <React.Fragment>

            <div style={{width: '45rem', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                    <h1>Administrador de información</h1>
                    <h3>Consulta información</h3>
                </div>
                <div>
                    <a href='/' >back to home</a>

                </div>
            </div>

            <Container className='contenedor'>
                <Row>

                    <Form onSubmit={handleSubmit} className="mb-3">

                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div style={{width: '49%', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                        Pet name: 
                                    </Form.Label>
                                    <Col>
                                        <Form.Control 
                                            type="text" 
                                            name ="name"
                                            value = {formulario.name} 
                                            placeholder="Pet name" 
                                            onChange={updateForm} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                        Pet type: 
                                    </Form.Label>
                                    <Col>
                                        <Form.Control 
                                            type="text" 
                                            name="type" 
                                            value={formulario.type}
                                            placeholder="Dog, Cat, Turtle..." 
                                            onChange={updateForm} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                        Pet description: 
                                    </Form.Label>
                                    <Col>
                                        <Form.Control 
                                            type="text" 
                                            name="description" 
                                            value={formulario.description}
                                            placeholder="Pet description" 
                                            onChange={updateForm} />
                                    </Col>
                                </Form.Group>

                            </div>

                            <div style={{width: '49%', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                <p>Skills (optional)</p>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                        Skill 1: 
                                    </Form.Label>
                                    <Col>
                                        <Form.Control 
                                            type="text" 
                                            name="skillOne" 
                                            value={formulario.skillOne}
                                            onChange={updateForm} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                        Skill 2: 
                                    </Form.Label>
                                    <Col>
                                        <Form.Control 
                                            type="text" 
                                            name="skillTwo" 
                                            value={formulario.skillTwo}
                                            onChange={updateForm} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                                        Skill 3:
                                    </Form.Label>
                                    <Col>
                                        <Form.Control 
                                            type="text" 
                                            name="skillThree" 
                                            value={formulario.skillThree}
                                            onChange={updateForm} />
                                    </Col>
                                </Form.Group>
                            </div>
                        </div>
                    </Form>
                </Row>
            </Container>
            <Container className="contenedor">
                <Row>
                    <Col>
                        <a href='/'>
                            <Button variant="primary" type="submit" style={{width: '80%', justifySelf: 'center', marginTop: '20px'}}>
                                <BiUpload/> Agregar Lectura
                            </Button>
                        </a>
                    </Col>
                    <Col>
                        <a href='/informacion/nuevo'>
                            <Button variant="danger" type="submit" style={{width: '80%', justifySelf: 'center', marginTop: '20px'}}>
                                <BiUpload/> Nuevo Usuario
                            </Button>
                        </a>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}



export default PetForm;