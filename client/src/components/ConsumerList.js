import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Swal from 'sweetalert2';
import { BiHome } from 'react-icons/bi';

const InitialData = {
    name: '',
    type: '',
    description: '',
    skillOne: '',
    skillTwo: '',
    skillThree: ''
};


const ConsumerList = (props) => {

    const {id} = useParams();

    const [formulario,setFormulario] =useState(
        InitialData
    );

    const navigate = useNavigate();

    useEffect(()=>{
        console.log(id);
        axios.get('/api/'+props.dir+id)
        .then(res=>{
            setFormulario(res.data.justOne)
        })
        .then(console.log(formulario))
    },[])

    const handlePetDelete = (e) => {
        e.preventDefault();
        axios.delete('/api/'+props.dir+id)
            .then(res=>{
                console.log(res);
                console.log(Swal.fire('Thanks for adopting this pet!!'))
                navigate('/');
            })
            .catch(err=>console.log({err}))
    }
  
    return(
        <React.Fragment>
            <div style={{width: '40rem', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                    <h1>Pet Shelter</h1>
                    <p>Details about: {formulario.name} </p>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'start'}}>
                    <a href='/' >back to home</a>
                    <Button style={{ width: 'auto', marginTop: '10px'}} variant="danger" onClick={handlePetDelete} >
                        <BiHome/> Adopt {formulario.name}
                    </Button>

                </div>
            </div>


            <div style={{ width: '40rem', height: '20rem',  border: '2px solid black', borderRadius: '6px', boxShadow: '0px 0px 4px', marginTop: '10px', paddingTop: '20px'}}>
                <table style={{width: '40rem'}}>
                    <tbody>
                        <tr style={{width: '100%', flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <td style={{fontWeight: 'bold', width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '20px', marginBottom: '20px'}}>
                                Pet type:
                            </td>
                            <td style={{width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                {formulario.type}
                            </td>
                        </tr>
                        <tr style={{width: '100%', flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <td style={{fontWeight: 'bold', width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '20px', marginBottom: '20px'}}>
                                Description:
                            </td>
                            <td style={{width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                {formulario.description}
                            </td>
                        </tr>
                        <tr style={{width: '100%', flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <td style={{fontWeight: 'bold', width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '20px', marginBottom: '20px'}}>
                                Skills:
                            </td>
                            <td style={{width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                <div>{formulario.skillOne}</div>
                                <div>{formulario.skillTwo}</div>
                                <div>{formulario.skillThree}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </React.Fragment>

    )
}
export default ConsumerList;
