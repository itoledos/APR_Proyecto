import axios from 'axios';
import React, { useContext, useState } from 'react';
// REACT ROUTER DOM
import { Link, useNavigate } from 'react-router-dom';
// REACT BOOTSTRAP
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/Nav';

import UserContext from "../contextos/user-context";
import LogoAPR from '../LogoAPR';
import NavBarAPR from '../NavBarAPR';


const initialData = {
    username: '',
    password: '',
}


const Login = (props) => {

    const dir = props.dir;
    const [formulario, setFormulario] = useState(initialData);
    const context = useContext(UserContext)
    const navigate = useNavigate();

    const updateForm = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    const login = e => {
        e.preventDefault("/api/"+dir+"login");
        console.log()
        axios.post("/api/"+dir+"login", formulario)
            .then(resp => {
                if(!resp.data.error) {
                    context.setUsuario(resp.data.datos);
                    sessionStorage.setItem('USUARIO', JSON.stringify(resp.data.datos));
                    navigate('/admin');
                } else {
                    alert('Error en Login: '+resp.msg)
                }
            })
    }

    return(

        <React.Fragment>
            <Container className='d-flex flex-wrap flex-column justify-content-start align-items-center' style={{height: '100vh'}}>
                <NavBarAPR/>

                <Form className="FormRegister w-50 mt-5" onSubmit={login}
                    style={{
                        position: 'absolute',
                        top: '10%'
                    }}
                >
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={4}>
                            Email
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control 
                                name='username' 
                                type="username" 
                                required
                                value={formulario.username} 
                                placeholder="username" 
                                onChange={updateForm} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={4}>
                            Contraseña
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control 
                                name='password' 
                                type="password" 
                                minLength={3}
                                value={formulario.password} 
                                placeholder="password" 
                                onChange={updateForm} />
                        </Col>
                    </Form.Group>
                    <div className='d-flex flex-column align-items-center'>
                        <Button className='mt-3' type='submit'
                            style={{
                                minWidth: '180px'
                            }}
                        >
                        Login
                        </Button>
                        <Link to="/">Volver</Link>
                        <Link to="/usuario">Registrarse</Link>
                    </div>
                </Form>

            </Container>
            {/* <div className="custom-shape-divider-bottom-1663616164">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
            </div> */}
        </React.Fragment>

    )
}

export default Login;