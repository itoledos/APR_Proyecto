import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import UserContext from "../contextos/user-context";
// REACT BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { BiUpload } from 'react-icons/bi';

const InitialData = {
    userID: '',
    rolProp: '',
    name: '',
    address: '',
    mail: '',
    phone: 900000000,
    meterID: '',
    member: false,
    active: true
};

const NuevoUsuario = (props) => {

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
    const [form, setForm] = useState(
        InitialData
    );

    const updateForm = ({target: {name, value}}) => {
        setForm({
            ...form,
            [name]: value
        });
        }

    const updateCheckbox = ({target: {name, checked}}) => {
        setForm({
            ...form,
            [name]: checked
        });
        }

    const salir = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('USUARIO');
        navigate('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/consumers/new', 
           form
        )
        .then(res=>{
            if(form.userID.toString().length<1||form.rolProp.toString().length<1||form.name.toString().length<1||form.address.toString().length<1||form.mail.toString().length<1||form.phone.toString().length<1||form.meterID.toString().length<1){
                console.log(Swal.fire(`Todos los campos son requeridos`))
            } else {
                Swal.fire(`Usuario añadido exitosamente`);
                navigate('/admin')
            }
        })
        .catch(err=>{
            alert(err);
            console.log(err);
        })
    }

    return(
        <React.Fragment>

            <Container>
                <Card className='w-100 mt-2' border='light' style={{boxShadow: '1px 1px 10px 2px #D1D1D1'}}>
                    <Card.Header as='h2' style={{background: '#ffffff', color: '#666666'}}>Administrador de Información</Card.Header>
                    <Card.Body>
                        <Card.Title as='h4' style={{color: '#666666', marginBottom: '20px'}}>Crear nuevo usuario</Card.Title>
                        <Form onSubmit={handleSubmit} style={{fontSize: '1em'}}>

                            <Container as={Row} style={{padding: '0px'}}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3 w-75">
                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                ID Usuario: 
                                            </Form.Label>
                                            <Form.Control
                                                type="text" 
                                                name ="userID"
                                                value = {form.userID} 
                                                placeholder="Ingrese ID Usuario" 
                                                size="sm"
                                                onChange={updateForm} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3 w-75">
                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                Rol de la propiedad: 
                                            </Form.Label>
                                            <Form.Control
                                                type="text" 
                                                name ="rolProp"
                                                value = {form.rolProp} 
                                                placeholder="Ingrese rol de propiedad" 
                                                size="sm"
                                                onChange={updateForm} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3 w-75">
                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                Nombre Usuario: 
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="name" 
                                                value={form.name}
                                                placeholder="Ingrese nombre de Usuario/a" 
                                                size="sm"
                                                onChange={updateForm} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3 w-75">
                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                Mail: 
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="mail" 
                                                value={form.mail}
                                                placeholder="ejemplo@ejemplo.com" 
                                                size="sm"
                                                onChange={updateForm} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3 w-75">
                                        <Row className="mb-0 w-50">
                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                Dirección: 
                                            </Form.Label>
                                        </Row>
                                        <Form.Control 
                                            type="text" 
                                            name="address" 
                                            value={form.address}
                                            placeholder="Nombre calle, Número, Sector" 
                                            size="sm"
                                            onChange={updateForm} />
                                            </Form.Group>
                                    
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3 w-75">
                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                Teléfono: 
                                            </Form.Label>
                                            <Form.Control 
                                                type="number" 
                                                name="phone" 
                                                value={form.phone}
                                                min={900000000}
                                                max={999999999}
                                                placeholder="900000000" 
                                                size="sm"
                                                onChange={updateForm} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3 w-75">
                                            <Form.Label className="d-flex flex-wrap justify-content-start mb-0">
                                                Identificador del medidor: 
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="meterID" 
                                                value={form.meterID}
                                                placeholder="######" 
                                                size="sm"
                                                onChange={updateForm} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col>
                                        <Form.Group className="w-75 d-flex flex-wrap justify-content-center mb-0">
                                            <Form.Check 
                                                type="checkbox"
                                                name="member" 
                                                label="Socio?"
                                                checked={form.member}
                                                size="sm"
                                                onChange={updateCheckbox}  />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                            </Container>
                            <Button className="mb-1 w-25" variant="success" type="submit" size='sm'>
                                <BiUpload/> Agregar Usuario
                            </Button>

                        </Form>
                        

                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col>
                                <a href='/' >Volver a Página principal</a>
                            </Col>
                            <Col>
                                <a href='/admin' >Volver a Menú de operaciones</a>
                            </Col>
                            <Col>
                                <a href='#' onClick={salir} style={{color: '#444444'}} >Cerrar Sesión</a>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>



            </Container>
            <div className="custom-shape-divider-bottom-1663632977">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
            </div>
        </React.Fragment>
    )
}



export default NuevoUsuario;