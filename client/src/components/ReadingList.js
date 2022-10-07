import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBarAPR from "./NavBarAPR";
// REACT ROUTER DOM
import { useNavigate, useParams } from 'react-router-dom';
// REACT BOOTSTRAP
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
// REACT ICONS
import { BiBorderTop, BiHome } from 'react-icons/bi';
// OTROS
import Swal from 'sweetalert2';
import LogoAPR from './LogoAPR';

const InitialReading = {
    userID: '',
    rolProp: '',
    meterID: '',
    anio: 1950,
    mes: '',
    medicion: '',
}

const InitialUser = {
    userID: '',
    name: '',
    address: '',
    mail: '',
    phone: 900000000,
    meterID: '',
    member: false,
    active: true
}

const tarifa = [400,600,1200];


const ReadingList = (props) => {

    const {id, id2} = useParams();

    const [lectura,setLectura] =useState(
        InitialReading
    );
    const [lecturaAnterior,setLecturaAnterior] =useState(
        InitialReading
    );
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [usuarios, setUsuarios] = useState(
        InitialUser
    );

    const navigate = useNavigate();

    useEffect(()=>{
        // console.log(id+' '+id2);
        
        axios.get('/api/readings/'+id)
        .then(res=>{
            setLectura(res.data.justOne);
        })
        
        axios.get('/api/readings/'+id2)
        .then(res=>{
            setLecturaAnterior(res.data.justOne);
        })
        
        axios.get('/api/consumers/all')
        .then(res=>{
            let datos=res.data.all;
            console.log(datos);
            setUsuarios(datos.find(e=>e.userID==lectura.userID));
            // setListaUsuarios(datos);
        })

        // .then(res2=>
        //     {
        //         console.log(res2);
        //         setTimeout(setUsuarios(res2.find(e=>e.userID==listaUsuarios.userID)),300)
        //     }
        //     );
        // setTimeout(console.log(usuarios), 1500)
    },[])
    
    const pago = (actual, anterior) => {
        let dif = actual - anterior;
        if(dif<=10) {
            return(dif*tarifa[0])
        } else if(dif <= 15){
            return(10*tarifa[0] + (dif-10)*tarifa[1])
        } else {
            return(10*tarifa[0] + 5*tarifa[1] + (dif-15)*tarifa[2])
        }

    }
  
    return(
        <React.Fragment>
            <Container 
                className=' d-flex flex-column justify-content-start align-items-center mb-0'
                style={{
                    height: '100vh'
                }}
            >
                <NavBarAPR/>

                <Card
                    style={{
                        position: 'relative',
                        top: '15%',
                        width: '50%',
                        minWidth: '370px'
                    }}
                >
                    <Card.Header>
                        <h2>Boleta período {lectura.mes}/{lectura.anio}</h2>
                    </Card.Header>
                    <Card.Body>
                        <Table>
                            <thead style={{borderTop: '4px solid gray'}}>
                                <tr>
                                    <th>Datos usuario</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody style={{borderTop: '4px solid gray'}}>
                                {/* {usuarios.userID==lectura.userID && 
                                    <tr>
                                        <td>Nombre: </td>
                                        <td>
                                            {usuarios.name}
                                        </td>
                                    </tr>
                                } */}
                                <tr>
                                    <td>Rol propiedad: </td>
                                    <td>{lectura.rolProp}</td>
                                </tr>
                                <tr>
                                    <td>Número de Usuario: </td>
                                    <td>{lectura.userID}</td>
                                </tr>
                                <tr>
                                    <td>ID de medidor: </td>
                                    <td>{lectura.meterID}</td>
                                </tr>

                            </tbody>
                            <thead style={{borderTop: '4px solid gray'}}>
                                <tr>
                                    <th>Ítem</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody style={{borderTop: '4px solid gray'}}>
                                <tr>
                                    <td>Lectura actual ({lectura.mes}/{lectura.anio}): </td>
                                    <td>{lectura.medicion} m3</td>
                                </tr>
                                <tr>
                                    <td>Lectura anterior ({lecturaAnterior.mes}/{lecturaAnterior.anio}): </td>
                                    <td>{lecturaAnterior.medicion} m3</td>
                                </tr>
                                <tr>
                                    <td>Consumo del período: </td>
                                    <td>{lectura.medicion-lecturaAnterior.medicion} m3</td>
                                </tr>
                                <tr>
                                    <td><b>Total a pagar</b></td>
                                    <td><b>$ {pago(lectura.medicion, lecturaAnterior.medicion)}</b></td>
                                </tr>
                            </tbody>
                            <tfoot style={{
                                    fontSize: '0.8em', 
                                    borderTop: '4px solid gray', 
                                    textAlign: 'initial'}}>
                                <tr>
                                    <td style={{paddingLeft: '10px'}}>
                                        Tramos tarifarios
                                        <ul>
                                            <li>0 a 10 m3  ................${tarifa[0]}</li>
                                        </ul>
                                        <ul>
                                            <li>entre 10 y 15 m3  ....${tarifa[1]}</li>
                                        </ul>
                                        <ul>
                                            <li>más de 15 m3  .........${tarifa[2]}</li>
                                        </ul>
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>

                        </Table>
                    </Card.Body>
                </Card>
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
export default ReadingList;
