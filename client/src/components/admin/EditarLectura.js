import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import UserContext from "../contextos/user-context";
// REACT BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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

const InitialReading = {
    userID: '',
    rolProp: '',
    meterID: '',
    anio: 1950,
    mes: '',
    medicion: ''
}

const EditarLectura = (props) => {

    const context = useContext(UserContext)

    const navigate=useNavigate();
    const [form, setForm] = useState(
        InitialData
    );
    const [usuarios, setUsuarios] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const [mostrarDos, setMostrarDos] = useState(false);
    const [id, setId] = useState('');
    const [idLectura, setIdLectura] = useState('');
    const [lecturasTodas, setLecturasTodas] = useState(InitialReading);
    const [lectura, setLectura] = useState(InitialReading);


    useEffect(()=> {
        if(!context.usuario){
            if(sessionStorage.getItem('USUARIO')){
                context.setUsuario(JSON.parse(sessionStorage.getItem('USUARIO')));
            }
            else {
            navigate('/login');
            }
        } else {
            sessionStorage.setItem('USUARIO', JSON.stringify(context.usuario)); 
        };
        axios.get('/api/consumers/all')
        .then(res=>{
            setUsuarios(res.data.all);
        })
        axios.get('/api/readings/all')
        .then(res=>{
            setLecturasTodas(res.data.all);
        })
    }, [])


    const updateLectura = ({target: {name, value}}) => {
        setLectura({
            ...lectura,
            [name]: value})

        if(name=='anio'&&lectura.mes!=''){
            setMostrarDos(true)
        } else if(name=='mes'&&lectura.anio!=1950) {
            setMostrarDos(true)
        } else if(lectura.mes!=''&&lectura.anio!=1950) {
            setMostrarDos(true)
        } else {
            setMostrarDos(false)
        }
    }

    const updateLecturaDos = ({target: {name, value}}) => {
        setLectura({
            ...lectura,
            [name]: value
        });
    }

    const findUser = ({target: {value}}) => {
        if(value!='') {
            axios.get('/api/consumers/'+value)
            .then(res=>{
                setForm(res.data.justOne);
                setLectura({
                        userID: usuarios.find(itm=>itm._id==value).userID,
                        rolProp: usuarios.find(itm=>itm._id==value).rolProp,
                        meterID: usuarios.find(itm=>itm._id==value).meterID,
                        anio: 1950,
                        mes: '',
                        medicion: ''
                    });
            })
            .then(setMostrar(true))
            .then(setId(value))
        } else {
            setMostrar(false)
        }
    }

    const showReading = ({target: {name,value}}) => {
        // console.log(lectura);
        // setLectura({
        //     ...lectura,
        //     ['medicion']: lecturasTodas.find(itm=>itm.userID==lectura.userID&&itm.mes==lectura.mes&&itm.anio==lectura.anio).medicion
        // });
        // setIdLectura(lecturasTodas.find(itm=>itm.userID==lectura.userID&&itm.mes==lectura.mes&&itm.anio==lectura.anio)._id);

        axios.get('/api/readings/all')
        .then(res=> {
            setLecturasTodas(res.data.all)
        })
        .then(()=>
            setLectura({
                ...lectura,
                ['medicion']: lecturasTodas.find(itm=>itm.userID==lectura.userID&&itm.mes==lectura.mes&&itm.anio==lectura.anio).medicion
            })
        )
        .then(
            setIdLectura(lecturasTodas.find(itm=>itm.userID==lectura.userID&&itm.mes==lectura.mes&&itm.anio==lectura.anio)._id)
        )
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/api/readings/'+idLectura,
        lectura)
        .then(res=>{
            console.log(res);
        })
        .then(ud=>{
            console.log(ud);
            Swal.fire(`Lectura editada exitosamente`);
        })
    }
                    
    const salir = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('USUARIO');
        navigate('/');
    }
                    return(
                        <React.Fragment>
            <Container className="d-flex flex-wrap justify-content-center">
                <Card className='w-75 mt-5' border='light' style={{boxShadow: '1px 1px 10px 2px #D1D1D1', minWidth: '360px'}}>
                    <Card.Header as='h2' style={{background: '#ffffff', color: '#666666'}}>Administrador de Información</Card.Header>
                    <Card.Body>
                        <Card.Title as='h4' style={{color: '#666666'}}>Ingresar nueva lectura</Card.Title>
                        <Form className="mt-2" onSubmit={handleSubmit} style={{fontSize: '1em'}}>
                            <Container 
                                as={Row}
                                className="d-flex flex-wrap flex-column align-items-center w-100 mb-2"
                                style={{
                                    // marginLeft: '40px',
                                    minWidth: '360px',
                                    borderRadius: '4px',
                                    background: 'none',
                                }}
                            >
                                <Form.Label className="mb-2 mt-3 w-25">
                                    Elegir ID Usuario: 
                                </Form.Label>
                                <Form.Select className="mb-2 mt-2 w-75" 
                                    aria-label="Default select example"
                                    size='sm'
                                    onChange={findUser} >
                                        <option value=''>Listado de usuarios</option>
                                    {usuarios.map((itm,idx)=>{
                                        return(
                                            <option key={idx} medicion={itm.userID} value={itm._id}
                                                style={{fontSize: '1em'}}
                                            >{itm.userID} - {itm.name}</option>
                                        )
                                    })}
                                </Form.Select>

                            </Container>
                            <Container
                                as={Row}
                                className="d-flex flex-wrap justify-content-end w-100 mb-2"
                            >
                                <Row>
                                    <Col>
                                        <Form.Group className="d-flex flex-wrap flex-column align-items-center mb-3 w-75"
                                            style={{
                                                minWidth: '250px'
                                            }}
                                        >
                                            <Form.Label className="mb-2 mt-2 w-25">
                                                Año: 
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                min={1950} 
                                                name ="anio"
                                                value = {lectura.anio}  
                                                size='sm'
                                                onChange={updateLectura} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3 w-75"
                                            style={{
                                                minWidth: '250px'
                                            }}
                                        >
                                            <Form.Label className="mb-2 mt-2 w-25">
                                                Mes: 
                                            </Form.Label>
                                            <Form.Select name='mes' size='sm' onChange={updateLectura}>
                                                <option name='mes' value=''>Seleccione mes</option>
                                                <option name='mes' value='01'>Enero</option>
                                                <option name='mes' value='02'>Febrero</option>
                                                <option name='mes' value='03'>Marzo</option>
                                                <option name='mes' value='04'>Abril</option>
                                                <option name='mes' value='05'>Mayo</option>
                                                <option name='mes' value='06'>Junio</option>
                                                <option name='mes' value='07'>Julio</option>
                                                <option name='mes' value='08'>Agosto</option>
                                                <option name='mes' value='09'>Septiembre</option>
                                                <option name='mes' value='10'>Octubre</option>
                                                <option name='mes' value='11'>Noviembre</option>
                                                <option name='mes' value='12'>Diciembre</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>

                            
                            {mostrar && mostrarDos && 
                                        <Container>
                                            <Container as={Row} className="justify-content-center">
                        
                                            </Container>
                        
                                            <Container as={Row} className="justify-content-center">
                                            </Container>
                                            
                                            <Container as={Row} className="justify-content-center">
                                                <Form.Group className="d-flex flex-wrap flex-column align-items-center mb-3 w-75"
                                                    style={{
                                                        minWidth: '250px'
                                                    }}
                                                >
                                                    <Form.Label className="mb-2 mt-2 w-25">
                                                        Lectura: 
                                                    </Form.Label>
                                                    <Form.Control 
                                                        style={{width: '20%', minWidth: '250px'}}
                                                        type="number" 
                                                        name="medicion" 
                                                        value={lectura.medicion}
                                                        placeholder="m3 acumulados" 
                                                        size='sm'
                                                        onChange={updateLecturaDos} />
                                                </Form.Group>
                                                <Button 
                                                    className="mb-3 w-25" 
                                                    name='medicion'
                                                    value={lectura.medicion} 
                                                    variant="light" 
                                                    onClick={showReading}
                                                    style={{minWidth: '200px', margin: '10px'}}
                                                >
                                                    <BiUpload/> Mostrar lectura actual
                                                </Button>
                                                <Button className="mb-3 w-25" variant="warning" type="submit"
                                                    style={{minWidth: '200px', margin: '10px'}}
                                                >
                                                    <BiUpload/> Ingresar lectura
                                                </Button>
                                            </Container>

                                        </Container>
                                }
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
            {/* <div className="custom-shape-divider-bottom-1663632977">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
            </div> */}
        </React.Fragment>
    )
}



export default EditarLectura;