import React, { useState } from 'react'
import { Grid, Button, } from 'semantic-ui-react';
import useAuth from "../../hooks/useAuth";
import "./Home.scss";
import ModalBasic from '../../components/Modal/ModaslBasic/ModalBasic';
import ProyectForm from '../../components/SProyec/ProyectForm';
import UploadImage from '../../components/SProyec/UploadImage';
import EjecComando from '../../components/SProyec/EjecComando';


export default function Home() {
    const auth = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("")
    const [childrenModal, setChildrenModal] = useState(null)
    


const handlerModal =( type) =>{
    switch (type) {
        case "subirproyecto":
            setTitleModal("Subir un Proyecto")
            setChildrenModal(<ProyectForm 
                setShowModal={setShowModal} 
                setTitleModal={setTitleModal}
                setChildrenModal={setChildrenModal}
                />)
            setShowModal(true)
            break;
        case "armarComando":
            setTitleModal("Armar un comando");
            setChildrenModal(<UploadImage 
                setShowModal={setShowModal} 
                setTitleModal={setTitleModal}
                setChildrenModal={setChildrenModal}
                />);
            setShowModal(true)
            break;
    
        case "ejecutarComando":
                setTitleModal("Mandar a ejecutar un comando");
                setChildrenModal(<EjecComando 
                    setShowModal={setShowModal} 
                    setTitleModal={setTitleModal}
                    setChildrenModal={setChildrenModal}
                    />);
                setShowModal(true)
                break;
        case "resultado":
                setTitleModal("Ver resultado");
                setChildrenModal(<div><h2>ajustes del perfil</h2></div>);
                setShowModal(true)
                break;
        
         default:
            break;
    }
}


    return (
        <>
            <Grid.Column className="opciones">
               

                    <Button onClick={()=>handlerModal("subirproyecto")}>Subir un proyecto</Button>
                    <Button onClick={()=>handlerModal("armarComando")}>Armar un comando</Button>
                    <Button onClick={()=>handlerModal("ejecutarComando")}>Mandar a ejecutar un comando</Button>
                    <Button onClick={()=>handlerModal("resultado")}>Ver resultado</Button>
                    {/* <Button type="submit" className='btn-submit'>salir</Button> */}
                    
        
            </Grid.Column>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </ModalBasic>
        </>
    );
}
